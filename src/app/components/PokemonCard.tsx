import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

interface PokemonCardProps {
  selectedPokemon: PokemonDetails | null;
}

const PokemonCard = ({ selectedPokemon }: PokemonCardProps) => {
  if (!selectedPokemon) return null;

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
          <CardMedia
            component="img"
            alt={selectedPokemon.name}
            height="200"
            image={selectedPokemon.sprites.front_default}
          />
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 800 }}>
              {selectedPokemon.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Height: {selectedPokemon.height}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Weight: {selectedPokemon.weight}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Types: {selectedPokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Abilities: {selectedPokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PokemonCard;