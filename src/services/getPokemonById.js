import axiosClient from "./axiosClient";

export const getPokemonById = async (id) => {
  try {
    const res = await axiosClient.get(`/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
