import Image from 'next/image';
import Link from 'next/link';
import { Pokemon, TYPE_COLORS } from '@/lib/api';

interface PokemonCardProps {
  pokemon: Pokemon;
}

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
                  className={`${TYPE_COLORS[type.name.toLowerCase()] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full capitalize`}
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
