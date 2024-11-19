"use client";

import React, { useState, useEffect } from 'react';
import { fetchPokemonList, fetchPokemonDetails } from '../utils/api';
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box, SelectChangeEvent } from '@mui/material';
import PokemonCard from './components/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
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

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const results = await fetchPokemonList();
        setPokemon(results);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSelectChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedName = event.target.value as string;
    try {
      const response = await fetchPokemonDetails(selectedName);
      setSelectedPokemon(response);
    } catch (err: unknown) { // Change Error to unknown
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

  const menuItemStyle = {
    color: 'black', 
    '&:hover': { backgroundColor: '#f0f0f0' },
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };

  const selectStyle = {
    backgroundColor: 'white',
    color: 'black',
    '.MuiSelect-select': {
      fontSize: '1.2rem',
      fontWeight: 'bold'
    }
  };

  return (
    <Container sx={{ background: 'linear-gradient(to right, #ffecd2, #fcb69f)', minHeight: '100vh', py: 4 }}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Pokémon Explorer
        </Typography>
        <FormControl sx={{ width: '300px', margin: '0 auto' }} margin="normal" variant="outlined">
          <InputLabel sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} shrink={!!selectedPokemon}>
            {selectedPokemon ? '' : 'Select Pokémon'}
          </InputLabel>
          <Select
            onChange={(event: SelectChangeEvent<string>) => {
              handleSelectChange({
                target: { value: event.target.value }
              } as React.ChangeEvent<{ value: unknown }>);
            }}
            defaultValue=""
            value={selectedPokemon?.name || ''}
            sx={selectStyle}
          >
            {pokemon.map((p, index) => (
              <MenuItem key={index} value={p.name} sx={menuItemStyle}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <PokemonCard selectedPokemon={selectedPokemon} />
    </Container>
  );
}