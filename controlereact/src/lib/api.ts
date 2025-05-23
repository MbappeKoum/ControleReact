const API_BASE_URL = 'https://pokeapi.co/api/v2';
const LANGUAGE = 'fr';

const fetchOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store',
};

export const TYPE_COLORS: Record<string, string> = {
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

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  color?: string;
}

export interface PokemonDetail extends Pokemon {
  stats: PokemonStat[];
  evolutions: Pokemon[];
  height: number;
  weight: number;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonType {
  id: number;
  name: string;
}

export interface PokemonsResponse {
  data: Pokemon[];
  count: number;
}

export async function fetchPokemons({
  page = 1,
  limit = 50,
  name = '',
  typeId = '',
  types = [],
}: {
  page?: number;
  limit?: number;
  name?: string;
  typeId?: string | number;
  types?: (string | number)[];
}): Promise<PokemonsResponse> {
  try {
    console.log('Fetching pokemons with params:', { page, limit, name, typeId, types });
    const offset = (page - 1) * limit;
    
    const url = `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;
    console.log('Fetching from URL:', url);
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    console.log('API response count:', data.count);
    
    const pokemonUrls = data.results.map((p: {url: string}) => p.url);
    console.log(`Got ${pokemonUrls.length} pokemon URLs`);
    
    const pokemonDetailsPromises = pokemonUrls.map((url: string) => 
      fetch(url, fetchOptions)
        .then(res => res.json())
        .catch(err => {
          console.error(`Error fetching pokemon details from ${url}:`, err);
          return null;
        })
    );
    
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    const validPokemonDetails = pokemonDetails.filter(p => p !== null);
    console.log(`Successfully fetched ${validPokemonDetails.length} pokemon details`);
    
    const pokemonSpeciesPromises = validPokemonDetails.map((pokemon: any) => 
      fetch(pokemon.species.url, fetchOptions)
        .then(res => res.json())
        .catch(err => {
          console.error(`Error fetching pokemon species from ${pokemon.species.url}:`, err);
          return null;
        })
    );
    
    const pokemonSpecies = await Promise.all(pokemonSpeciesPromises);
    
    const pokemonPromises = validPokemonDetails.map(async (pokemon: any, index: number) => {
      let name = pokemon.name;
      const species = pokemonSpecies[index];
      
      if (species && species.names) {
        const frenchName = species.names.find((n: any) => n.language.name === LANGUAGE);
        if (frenchName) {
          name = frenchName.name;
        }
      }
      
      
      const typePromises = pokemon.types.map(async (t: { type: { url: string; name: string } }) => {
        const id = extractIdFromUrl(t.type.url);
        let name = t.type.name;
        
        try {
          const typeResponse = await fetch(t.type.url, fetchOptions);
          const typeData = await typeResponse.json();
          
          if (typeData.names) {
            const frenchName = typeData.names.find((n: any) => n.language.name === LANGUAGE);
            if (frenchName) {
              name = frenchName.name;
            }
          }
        } catch (error) {
          console.error(`Error fetching type details for ${t.type.name}:`, error);
        }
        
        return {
          id,
          name
        };
      });
      
      const types = await Promise.all(typePromises);
      
      // Get Pokemon color from species data
      let color = '';
      if (species && species.color && species.color.name) {
        color = species.color.name;
      }
      
      return {
        id: pokemon.id,
        name: name,
        image: pokemon.sprites.other?.['official-artwork']?.front_default || 
               pokemon.sprites.front_default,
        types: types,
        color: color
      };
    });
    
    const pokemons = await Promise.all(pokemonPromises);
    let filteredPokemons = pokemons;
    if (name) {
      filteredPokemons = filteredPokemons.filter(p => 
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      console.log(`After name filter: ${filteredPokemons.length} pokemons`);
    }
    
    if (types && types.length > 0) {
      filteredPokemons = filteredPokemons.filter(pokemon => 
        types.some(typeId => 
          pokemon.types.some((t: PokemonType) => t.id === Number(typeId))
        )
      );
      console.log(`After type filter: ${filteredPokemons.length} pokemons`);
    }
    
    console.log(`Returning ${filteredPokemons.length} pokemons`);
    return {
      data: filteredPokemons,
      count: data.count
    };
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    return {
      data: [],
      count: 0
    };
  }
}


function extractIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}

export async function fetchPokemonById(id: string | number): Promise<PokemonDetail> {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${id}`, fetchOptions);
    const pokemon = await response.json();
    
    const statNames: Record<string, string> = {
      'hp': 'PV',
      'attack': 'Attaque',
      'defense': 'Défense',
      'special-attack': 'Attaque Spéciale',
      'special-defense': 'Défense Spéciale',
      'speed': 'Vitesse'
    };
    
    const stats = pokemon.stats.map((stat: {stat: {name: string}, base_stat: number}) => ({
      name: statNames[stat.stat.name] || stat.stat.name,
      value: stat.base_stat
    }));
    
    const typePromises = pokemon.types.map(async (t: { type: { url: string; name: string } }) => {
      const id = extractIdFromUrl(t.type.url);
      let name = t.type.name;
      
      try {
        const typeResponse = await fetch(t.type.url, fetchOptions);
        const typeData = await typeResponse.json();
        
        if (typeData.names) {
          const frenchName = typeData.names.find((n: any) => n.language.name === LANGUAGE);
          if (frenchName) {
            name = frenchName.name;
          }
        }
      } catch (error) {
        console.error(`Error fetching type details for ${t.type.name}:`, error);
      }
      
      return {
        id,
        name
      };
    });
    
    const types = await Promise.all(typePromises);
    
    let evolutions: Pokemon[] = [];
    
    try {
      const speciesResponse = await fetch(pokemon.species.url, fetchOptions);
      const speciesData = await speciesResponse.json();
      
      if (speciesData.evolution_chain?.url) {
        const evolutionResponse = await fetch(speciesData.evolution_chain.url, fetchOptions);
        const evolutionData = await evolutionResponse.json();
        
        evolutions = await processEvolutionChain(evolutionData.chain);
      }
    } catch (evolutionError) {
      console.error('Error fetching evolution chain:', evolutionError);
    }
    
    
    let name = pokemon.name;
    let color = '';
    try {
      const speciesResponse = await fetch(pokemon.species.url, fetchOptions);
      const speciesData = await speciesResponse.json();
      
      if (speciesData.names) {
        const frenchName = speciesData.names.find((n: any) => n.language.name === LANGUAGE);
        if (frenchName) {
          name = frenchName.name;
        }
      }
      
      if (speciesData.color && speciesData.color.name) {
        color = speciesData.color.name;
      }
    } catch (error) {
      console.error('Error fetching Pokemon species data:', error);
    }
    
    return {
      id: pokemon.id,
      name: name,
      image: pokemon.sprites.other?.['official-artwork']?.front_default || 
             pokemon.sprites.front_default,
      types: types,
      stats: stats,
      evolutions: evolutions,
      height: pokemon.height,
      weight: pokemon.weight,
      color: color
    };
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
    return {
      id: Number(id),
      name: 'Unknown Pokemon',
      image: '/placeholder.png',
      types: [],
      stats: [],
      evolutions: [],
      height: 0,
      weight: 0,
    };
  }
}

async function processEvolutionChain(chain: any): Promise<Pokemon[]> {
  const evolutions: Pokemon[] = [];
  
  if (!chain) return evolutions;
  
  try {
    if (chain.species) {
      const id = extractIdFromUrl(chain.species.url);
      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${id}`, fetchOptions);
        const pokemon = await response.json();
        
        
        let name = pokemon.name;
        let color = '';
        try {
          const speciesResponse = await fetch(pokemon.species.url, fetchOptions);
          const speciesData = await speciesResponse.json();
          
          if (speciesData.names) {
            const frenchName = speciesData.names.find((n: any) => n.language.name === LANGUAGE);
            if (frenchName) {
              name = frenchName.name;
            }
          }
          
          if (speciesData.color && speciesData.color.name) {
            color = speciesData.color.name;
          }
        } catch (error) {
          console.error(`Error fetching evolution pokemon species data for ${id}:`, error);
        }
        
        const typePromises = pokemon.types.map(async (t: { type: { url: string; name: string } }) => {
          const id = extractIdFromUrl(t.type.url);
          let name = t.type.name;
          
          try {
            const typeResponse = await fetch(t.type.url, fetchOptions);
            const typeData = await typeResponse.json();
            
            if (typeData.names) {
              const frenchName = typeData.names.find((n: any) => n.language.name === LANGUAGE);
              if (frenchName) {
                name = frenchName.name;
              }
            }
          } catch (error) {
            console.error(`Error fetching type details for ${t.type.name}:`, error);
          }
          
          return {
            id,
            name
          };
        });
        
        const types = await Promise.all(typePromises);
        
        evolutions.push({
          id: pokemon.id,
          name: name,
          image: pokemon.sprites.other?.['official-artwork']?.front_default || 
                 pokemon.sprites.front_default,
          types: types,
          color: color
        });
      } catch (error) {
        console.error(`Error fetching evolution pokemon ${id}:`, error);
      }
    }
    
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        const nextEvolutions = await processEvolutionChain(evolution);
        evolutions.push(...nextEvolutions);
      }
    }
  } catch (error) {
    console.error('Error processing evolution chain:', error);
  }
  
  return evolutions;
}

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  try {
    console.log('Fetching Pokemon types...');
    const response = await fetch(`${API_BASE_URL}/type`, fetchOptions);
    const data = await response.json();
    console.log('Pokemon types API response:', data);
    
    const typePromises = data.results
      .filter((type: {name: string}) => type.name !== 'unknown' && type.name !== 'shadow')
      .map(async (type: {name: string, url: string}) => {
        const id = extractIdFromUrl(type.url);
        let name = type.name;
        
        try {
          const typeResponse = await fetch(type.url, fetchOptions);
          const typeData = await typeResponse.json();
          
          if (typeData.names) {
            const frenchName = typeData.names.find((n: any) => n.language.name === LANGUAGE);
            if (frenchName) {
              name = frenchName.name;
            }
          }
        } catch (error) {
          console.error(`Error fetching type details for ${type.name}:`, error);
        }
        
        return {
          id,
          name
        };
      });
    
    const types = await Promise.all(typePromises);
    console.log('Processed Pokemon types:', types);
    return types;
  } catch (error) {
    console.error('Error fetching pokemon types:', error);
    return [];
  }
}
