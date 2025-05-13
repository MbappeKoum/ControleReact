import PokemonDetail from '@/components/PokemonDetail';
import { fetchPokemonById } from '@/lib/api';
import type { Metadata } from 'next';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: PokemonDetailPageProps): Promise<Metadata> {
  try {
    const pokemon = await fetchPokemonById(params.id);
    
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${params.id}) - Pokédex`,
      description: `View details for ${pokemon.name}, including stats, types, and evolutions.`,
    };
  } catch (error) {
    return {
      title: 'Pokemon Details - Pokédex',
      description: 'View detailed information about this Pokemon',
    };
  }
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  return <PokemonDetail pokemonId={params.id} />;
}
