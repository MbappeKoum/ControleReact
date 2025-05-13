// API base URL
const API_BASE_URL = 'https://nestjs-pokedex-api.vercel.app';

// Fetch options
const fetchOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
  cache: 'no-store', // Disable caching
};

// Mock data for testing
const MOCK_DATA = {
  pokemons: [
    {
      id: 1,
      name: 'Bulbasaur',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      types: [{ id: 12, name: 'Grass' }, { id: 4, name: 'Poison' }]
    },
    {
      id: 4,
      name: 'Charmander',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
      types: [{ id: 10, name: 'Fire' }]
    },
    {
      id: 7,
      name: 'Squirtle',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
      types: [{ id: 11, name: 'Water' }]
    }
  ],
  types: [
    { id: 1, name: 'Normal' },
    { id: 10, name: 'Fire' },
    { id: 11, name: 'Water' },
    { id: 12, name: 'Grass' },
    { id: 4, name: 'Poison' }
  ]
};

// Types
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
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

// Fetch Pokemon list with filters
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
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  
  if (name) {
    params.append('name', name);
  }
  
  if (typeId) {
    params.append('typeId', typeId.toString());
  }
  
  if (types.length > 0) {
    types.forEach(type => params.append('types', type.toString()));
  }
  
  // Use mock data for now due to API issues
  console.log('Fetching pokemons with params:', { page, limit, name, typeId, types });
  
  // Filter mock data based on parameters
  let filteredPokemons = [...MOCK_DATA.pokemons];
  
  if (name) {
    filteredPokemons = filteredPokemons.filter(p => 
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  
  if (types && types.length > 0) {
    filteredPokemons = filteredPokemons.filter(p => 
      p.types.some(t => types.includes(t.id))
    );
  }
  
  return {
    data: filteredPokemons,
    count: filteredPokemons.length
  };
}

// Fetch Pokemon detail by ID
export async function fetchPokemonById(id: string | number): Promise<PokemonDetail> {
  // Use mock data for now due to API issues
  console.log('Fetching pokemon with id:', id);
  
  const pokemon = MOCK_DATA.pokemons.find(p => p.id === Number(id));
  
  if (!pokemon) {
    return {
      id: Number(id),
      name: 'Unknown Pokemon',
      image: '/placeholder.png',
      types: [],
      stats: [
        { name: 'hp', value: 45 },
        { name: 'attack', value: 49 },
        { name: 'defense', value: 49 },
        { name: 'special-attack', value: 65 },
        { name: 'special-defense', value: 65 },
        { name: 'speed', value: 45 }
      ],
      evolutions: [],
      height: 0,
      weight: 0,
    };
  }
  
  return {
    ...pokemon,
    stats: [
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
      { name: 'defense', value: 49 },
      { name: 'special-attack', value: 65 },
      { name: 'special-defense', value: 65 },
      { name: 'speed', value: 45 }
    ],
    evolutions: MOCK_DATA.pokemons.filter(p => p.id !== Number(id)).slice(0, 2),
    height: 7,
    weight: 69,
  };
}

// Fetch all Pokemon types
export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  // Use mock data for now due to API issues
  console.log('Fetching pokemon types');
  return MOCK_DATA.types;
}
