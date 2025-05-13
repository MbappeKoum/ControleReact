'use client';

import { useState, useEffect } from 'react';
import { PokemonType, fetchPokemonTypes } from '@/lib/api';
import SearchBar from './SearchBar';

interface PokemonFiltersProps {
  onNameChange: (name: string) => void;
  onTypeChange: (types: number[]) => void;
  onLimitChange: (limit: number) => void;
}

export default function PokemonFilters({
  onNameChange,
  onTypeChange,
  onLimitChange,
}: PokemonFiltersProps) {
  const [name, setName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [limit, setLimit] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        setIsLoading(true);
        const typesData = await fetchPokemonTypes();
        setTypes(typesData);
      } catch (err) {
        setError('Failed to load Pokemon types');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTypes();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onNameChange(newName);
  };

  const handleTypeChange = (typeId: number) => {
    const newTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter((id) => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newTypes);
    onTypeChange(newTypes);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    onLimitChange(newLimit);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <div className="space-y-4">
        {/* Name filter with autocomplete */}
        <div>
          <label htmlFor="name-filter" className="block text-sm font-medium mb-1">
            Pokemon Name
          </label>
          <SearchBar onSelect={onNameChange} />
        </div>
        
        {/* Limit filter */}
        <div>
          <label htmlFor="limit-filter" className="block text-sm font-medium mb-1">
            Pokemon per page
          </label>
          <select
            id="limit-filter"
            value={limit}
            onChange={handleLimitChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        
        {/* Type filter */}
        <div>
          <p className="block text-sm font-medium mb-2">Pokemon Type</p>
          
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading types...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeChange(type.id)}
                  className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                    selectedTypes.includes(type.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
