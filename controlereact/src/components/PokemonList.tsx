'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Pokemon, fetchPokemons } from '@/lib/api';
import PokemonCard from './PokemonCard';
import PokemonFilters from './PokemonFilters';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<number[]>([]);
  const [limit, setLimit] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadPokemons = useCallback(async (reset = false) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentPage = reset ? 1 : page;
      
      const response = await fetchPokemons({
        page: currentPage,
        limit,
        name: nameFilter,
        types: typeFilter,
      });
      
      setTotalCount(response.count);
      
      if (reset) {
        setPokemons(response.data);
      } else {
        // Add new pokemons, ensuring no duplicates by ID
        setPokemons((prev) => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPokemons = response.data.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPokemons];
        });
      }
      
      setHasMore(response.data.length === limit);
      
      if (!reset) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError('Failed to load Pokemon');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, nameFilter, typeFilter]);

  // Initial load
  useEffect(() => {
    loadPokemons(true);
    setPage(2); // Set to 2 for next load
  }, [nameFilter, typeFilter, limit]);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    if (isLoading || !hasMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadPokemons();
      }
    });
    
    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, hasMore, loadPokemons]);

  const handleNameChange = (name: string) => {
    setNameFilter(name);
    setPage(1);
  };

  const handleTypeChange = (types: number[]) => {
    setTypeFilter(types);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pokédex</h1>
      
      <PokemonFilters
        onNameChange={handleNameChange}
        onTypeChange={handleTypeChange}
        onLimitChange={handleLimitChange}
      />
      
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {pokemons.length} of {totalCount} Pokémon
        </p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {!isLoading && hasMore && (
        <div ref={loadingRef} className="h-20 flex items-center justify-center">
          <p className="text-gray-500">Scroll for more</p>
        </div>
      )}
      
      {!isLoading && !hasMore && pokemons.length > 0 && (
        <div className="text-center my-8">
          <p className="text-gray-500">No more Pokémon to load</p>
        </div>
      )}
      
      {!isLoading && pokemons.length === 0 && !error && (
        <div className="text-center my-8">
          <p className="text-gray-500">No Pokémon found matching your filters</p>
        </div>
      )}
    </div>
  );
}
