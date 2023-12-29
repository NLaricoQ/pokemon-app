import { createContext, useEffect, useState } from "react";

import { getAllTypes } from "../services/getAllTypes";

export const PokemonContext = createContext(null);

export const PokemonProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [pokemonTypes, setpokemonTypes] = useState([]);

  useEffect(() => {
    const loadAllTypes = async () => {
      const typesData = await getAllTypes();
      setpokemonTypes(typesData);
    };
    loadAllTypes();
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemonTypes, currentPage, setCurrentPage }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
