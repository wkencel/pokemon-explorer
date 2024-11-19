import axios from 'axios';

interface PokemonListResult {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListResult[];
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export const fetchPokemonList = async (limit = 151, offset = 0): Promise<PokemonListResult[]> => {
  const response = await axios.get<PokemonListResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data.results;
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await axios.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};