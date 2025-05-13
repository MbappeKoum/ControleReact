'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PokemonDetail as PokemonDetailType, fetchPokemonById } from '@/lib/api';
import PokemonStats from './PokemonStats';
import PokemonEvolution from './PokemonEvolution';

interface PokemonDetailProps {
  pokemonId: string;
}

export default function PokemonDetail({ pokemonId }: PokemonDetailProps) {
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const pokemonData = await fetchPokemonById(pokemonId);
        setPokemon(pokemonData);
      } catch (err) {
        setError('Failed to load Pokemon details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, [pokemonId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error || 'Failed to load Pokemon details'}</p>
        <Link href="/pokemons" className="text-blue-500 hover:underline mt-2 inline-block">
          Return to Pokemon list
        </Link>
      </div>
    );
  }

  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-600',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/pokemons" 
        className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        Back to Pokemon List
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="relative w-full md:w-1/3 h-64 md:h-80">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
            
            <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold capitalize mr-4">{pokemon.name}</h1>
                <span className="text-gray-500 dark:text-gray-400 text-xl">
                  #{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>
              
              <div className="flex gap-2 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type.id}
                    className={`${typeColors[type.name.toLowerCase()] || 'bg-gray-500'} text-white px-3 py-1 rounded-full capitalize`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                  <p className="text-lg font-medium">{pokemon.height / 10} m</p>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                  <p className="text-lg font-medium">{pokemon.weight / 10} kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <PokemonStats stats={pokemon.stats} />
        
        <PokemonEvolution 
          evolutions={pokemon.evolutions} 
          currentPokemonId={pokemon.id} 
        />
      </div>
    </div>
  );
}
