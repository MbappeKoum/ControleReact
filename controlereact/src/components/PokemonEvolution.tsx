import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/lib/api';

interface PokemonEvolutionProps {
  evolutions: Pokemon[];
  currentPokemonId: number;
}

export default function PokemonEvolution({
  evolutions,
  currentPokemonId,
}: PokemonEvolutionProps) {
  if (!evolutions || evolutions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Evolution Chain</h3>
        <p className="text-gray-500 dark:text-gray-400">This Pokémon does not evolve.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Evolution Chain</h3>
      
      <div className="flex flex-wrap justify-center items-center gap-4">
        {evolutions.map((pokemon, index) => (
          <div key={pokemon.id} className="flex items-center">
            {/* Pokemon evolution card */}
            <Link href={`/pokemons/${pokemon.id}`}>
              <div 
                className={`
                  p-4 rounded-lg transition-transform duration-300 hover:scale-105
                  ${pokemon.id === currentPokemonId ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}
                `}
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                  
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</p>
                    <h4 className="text-sm font-medium capitalize">{pokemon.name}</h4>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Arrow between evolutions */}
            {index < evolutions.length - 1 && (
              <div className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
