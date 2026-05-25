export async function fetchPokemon(
  name: string
) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
}
export default fetchPokemon;