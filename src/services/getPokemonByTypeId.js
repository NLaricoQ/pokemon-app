import axiosClient from "./axiosClient";

export const getPokemonByTypeId = async (id) => {
  try {
    const res = await axiosClient.get(`/type/${id}`);
    return res.data.pokemon.map((pokemonData) => pokemonData.pokemon);
  } catch (error) {
    console.log(error);
  }
};
