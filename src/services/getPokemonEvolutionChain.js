import axiosClient from "./axiosClient";

export const getEvolutionChainById = async (id) => {
  try {
    const res = await axiosClient.get(`/evolution-chain/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
