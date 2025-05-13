import PokemonList from '@/components/PokemonList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokédex - Pokemon List',
  description: 'Browse and filter Pokemon from the Pokedex',
};

export default function PokemonsPage() {
  return <PokemonList />;
}
