import { getAllPokemons } from "../../services/getAllPokemons";
import { getPokemonByTypeId } from "../../services/getPokemonByTypeId";

export const pokemonLoader = async ({ request }) => {
  const url = new URL(request.url);
  const pokemonType = url.searchParams.get("type");
  const pokemonName = url.searchParams.get("search");

  let pokemons;

  if (pokemonName && pokemonType) {
    pokemons = await getPokemonByTypeId(pokemonType);
    pokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );
  } else if (!pokemonName && !pokemonType) {
    pokemons = await getAllPokemons();
  } else if (pokemonName) {
    pokemons = await getAllPokemons();
    pokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
    );
  } else if (pokemonType) {
    pokemons = await getPokemonByTypeId(pokemonType);
  }

  return { pokemons };
};
