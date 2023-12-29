import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

const usePokemons = () => {
  return useContext(PokemonContext);
};

export default usePokemons;
