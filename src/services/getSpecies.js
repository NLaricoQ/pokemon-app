import axiosClient from "./axiosClient";

export const getSpeciesById = async (id) => {
  try {
    const res = await axiosClient.get(`/pokemon-species/${id}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      console.error(error);
      return null;
    }
  }
};
