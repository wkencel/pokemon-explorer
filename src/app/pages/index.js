import React, { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemonDetails } from "../../utils/api";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const results = await fetchPokemonList(10, (page - 1) * 10);
        setPokemon(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [page]);
    fetchPokemon();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
    setSearchTerm(event.target.value);
  const fetchPokemonDetailsHandler = async (url) => {
    try {
      const response = await fetchPokemonDetails(url);
      setSelectedPokemon(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Pokémon Explorer</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <ul>
        {filteredPokemon.map((p, index) => (
          <li key={index} onClick={() => fetchPokemonDetailsHandler(p.url)}>
            {p.name}
          </li>
        ))}
      </ul>
      {selectedPokemon && (
        <div>
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          {/* Add more details as needed */}
        </div>
      )}
        </div>
  );
};

export default Home;