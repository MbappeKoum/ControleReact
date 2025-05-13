'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePokemon } from '@/lib/PokemonContext';

export default function Navbar() {
  const { caughtPokemon } = usePokemon();
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/pokemons" className="flex items-center space-x-3">
            <div className="relative w-8 h-8">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path 
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" 
                  fill="#FF5350" 
                />
                <path 
                  d="M12 2C17.5228 2 22 6.47715 22 12H12V2Z" 
                  fill="#FF0000" 
                />
                <path 
                  d="M12 22C6.47715 22 2 17.5228 2 12H12V22Z" 
                  fill="#FF0000" 
                />
                <path 
                  d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" 
                  fill="white" 
                />
                <path 
                  d="M12 2V22M2 12H22" 
                  stroke="black" 
                  strokeWidth="2" 
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Pokédex</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/pokemons" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              Pokémon List
            </Link>
            
            <div className="flex items-center bg-red-500 text-white px-3 py-1 rounded-full">
              <svg 
                className="w-4 h-4 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-8a2 2 0 100-4 2 2 0 000 4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-sm font-medium">
                {caughtPokemon.length} Caught
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
