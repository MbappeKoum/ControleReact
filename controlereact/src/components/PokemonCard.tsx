import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon, TYPE_COLORS } from '@/lib/api';
import { usePokemon } from '@/lib/PokemonContext';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { isCaught, catchPokemon, releasePokemon } = usePokemon();
  const [catching, setCatching] = useState(false);
  const [animation, setAnimation] = useState('');
  const caught = isCaught(pokemon.id);

  const handleCatch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (caught) {
      releasePokemon(pokemon.id);
      return;
    }
    
    if (catching) return;
    
    setCatching(true);
    setAnimation('shake');
    
    setTimeout(() => {
      setAnimation('flash');
      
      setTimeout(() => {
        // 70% chance to catch
        const success = Math.random() < 0.7;
        
        if (success) {
          setAnimation('catch');
          setTimeout(() => {
            catchPokemon(pokemon.id);
            setAnimation('appear');
            setCatching(false);
          }, 1000);
        } else {
          setAnimation('bounce');
          setTimeout(() => {
            setAnimation('');
            setCatching(false);
          }, 500);
        }
      }, 500);
    }, 500);
  };

  return (
    <Link href={`/pokemons/${pokemon.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg relative">
        <div className="p-4 flex flex-col items-center">
          <div className={`relative w-40 h-40 transition-transform duration-500 group-hover:rotate-360 ${animation}`}>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain transition-transform duration-500 hover:rotate-360"
              priority
            />
            {caught && (
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Caught
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center relative">
            <p className="text-gray-500 dark:text-gray-400 text-sm">#{pokemon.id.toString().padStart(3, '0')}</p>
            <h3 className="text-lg font-semibold capitalize mt-1">{pokemon.name}</h3>
            
            <div className="flex gap-2 mt-2 justify-center mb-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.id}
                  className={`${TYPE_COLORS[type.name.toLowerCase()] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full capitalize`}
                >
                  {type.name}
                </span>
              ))}
            </div>
            
            <button
              onClick={handleCatch}
              disabled={catching}
              className={`mt-2 px-4 py-1 rounded-full text-white text-sm transition-colors ${
                caught 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : catching 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {caught ? 'Release' : catching ? 'Catching...' : 'Catch'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
