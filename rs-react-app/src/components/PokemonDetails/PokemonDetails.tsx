import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

type PokemonDetailsType = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
};

function PokemonDetails() {
  const { name } = useParams();

  const navigate = useNavigate();
  

  const [pokemon, setPokemon] =
    useState<PokemonDetailsType | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  useEffect(() => {
    async function loadPokemon() {
      if (!name) return;

      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

        if (!response.ok) {
          setError('Failed to load pokemon');
          return;
        }

        const data = await response.json();

        
        setPokemon(data);
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [name]);

  if (loading) {
    return <div
      className="loader"
      data-testid='loader'
      aria-label="Loading details"
    />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="pokemon-details">
      <button
      onClick={() => navigate('/search')}
      >
        Close
      </button>

      <h2>{pokemon.name}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />

      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>

      <h3>Abilities</h3>

      <ul>
        {pokemon.abilities.map((a) => (
          <li key={a.ability.name}>
            {a.ability.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonDetails;