import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/lib/api';

interface PokemonCardProps {
  pokemon: Pokemon;
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

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemons/${pokemon.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="p-4 flex flex-col items-center">
          <div className="relative w-40 h-40">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">#{pokemon.id.toString().padStart(3, '0')}</p>
            <h3 className="text-lg font-semibold capitalize mt-1">{pokemon.name}</h3>
            
            <div className="flex gap-2 mt-2 justify-center">
              {pokemon.types.map((type) => (
                <span
                  key={type.id}
                  className={`${typeColors[type.name.toLowerCase()] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full capitalize`}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
