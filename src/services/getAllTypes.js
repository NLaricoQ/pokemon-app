import axiosClient from "./axiosClient";

export const getAllTypes = async () => {
  try {
    const res = await axiosClient.get("/type");
    return res.data.results.map((type) => ({
      name: type.name,
      id: type.url.split("/").at(-2),
    }));
  } catch (error) {
    console.log(error);
  }
};
