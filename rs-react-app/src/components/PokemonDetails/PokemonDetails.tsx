"use client"; 

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

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
  const params = useParams();
const name = params?.name 
  ? params.name 
  : (Array.isArray(params?.slug) ? params.slug[1] : undefined);
  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
    const t = useTranslations("Details");
    const locale = useLocale(); 

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
    return <div className="loader" data-testid='loader' aria-label="Loading details" />;
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
        onClick={() => router.push(`/${locale}/pokemon-search/search`)}
      >
        {t("close")}
      </button>

      <h2>{pokemon.name}</h2>

            <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={200}
          height={300}
          priority
        />

      <p>{t("height")}: {pokemon.height}</p>
      <p>{t("weight")}: {pokemon.weight}</p>

      <h3>{t("abilities")}</h3>

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
