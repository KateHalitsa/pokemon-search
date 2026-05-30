import type { Item, Pokemon, PokemonDetails } from "../../App";
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
const CACHE_TTL = Number(
  import.meta.env.VITE_CACHE_TTL ?? 60
);
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  keepUnusedDataFor: CACHE_TTL,

  tagTypes: ['Pokemon', 'PokemonList'],

  endpoints: (builder) => ({
    getPokemonByName: builder.query<Item[], string>({
          async queryFn(name) {
              try { const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: 'Pokemon not found',
              },
            };
          }

          const details: PokemonDetails =
            await response.json();

          const abilities = details.abilities.map(
            (a) => a.ability.name
          );

          return {
            data: [
              {
                name: details.name,
                description:
                  'Abilities: ' + abilities.join(', '),
              },
            ],
          };}
              catch{
                  return {
                    error: {
                      status: 'FETCH_ERROR',
                      error: 'Network connection error',
                    },
                  };
              }
            },
           providesTags: (result, error, name) => [
            { type: 'Pokemon', id: name },
          ],  
    }),
      getPokemonList: builder.query<
      { items: Item[]; count: number },
      number>({
      async queryFn(currentPage) {
        try {
          const offset = (currentPage - 1) * 10;

          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
          );

          if (!response.ok) {
            return {
              error: {
                status: response.status,
                data: 'Failed to load pokemon',
              },
            };
          }

          const json = await response.json();

          const items = await Promise.all(
            json.results.map(
              async (pokemon: Pokemon) => {
                const detailsResponse =
                  await fetch(pokemon.url);

                const details: PokemonDetails =
                  await detailsResponse.json();

                const abilities =
                  details.abilities.map(
                    (a) => a.ability.name
                  );

                return {
                  name: details.name,
                  description:
                    'Abilities: ' +
                    abilities.join(', '),
                };
              }
            )
          );

          return {
            data: {
              items,
              count: json.count,
            },
          };
        } catch {
          return {
            error: {
              status: 'FETCH_ERROR',
              error: 'Network connection error',
            },
          };
        }
      },

      providesTags: (result, error, page) => [
        { type: 'PokemonList', id: page },
      ],
    }),
  })
})
export const {
useGetPokemonByNameQuery,
useGetPokemonListQuery
} = pokemonApi;
