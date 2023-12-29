import { useState } from "react";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import usePokemons from "../hooks/usePokemon";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useUserName from "../hooks/useUserName";

const Pokedex = () => {
  const { pokemons } = useLoaderData();
  const { userName } = useUserName();

  const navigate = useNavigate();
  const { pokemonTypes, currentPage, setCurrentPage } = usePokemons();

  const [search, setsearch] = useState("");

  const [type, setType] = useState("");

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    setCurrentPage(0);
    setsearch(newSearch);
    navigate(`?type=${type}&search=${newSearch}`);
  };

  const handleSelectType = (e) => {
    e.preventDefault();
    const selectedType = e.target.value;
    setType(selectedType);
    navigate(`?type=${selectedType}&search=${search}`);
  };

  const filteredPokemons = () => {
    return pokemons.slice(currentPage, currentPage + 15);
  };
  const nextPage = () => {
    if (pokemons.length > currentPage + 15) setCurrentPage(currentPage + 15);
  };

  const previousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 15);
  };
  const current = currentPage / 15 + 1;
  const total = Math.ceil(pokemons.length / 15);
  return (
    <>
      <Header />
      <h1 className=" mx-10  mb-10 text-xl lg:text-4xl font-bold pt-5">
        Bienvenido a esta aventura {userName}, puedes encontrar tus pokemon
        favoritos aquí
      </h1>
      <div className="flex flex-col items-center gap-5 ">
        <input
          className="p-2 rounded-md w-3/4 lg:w-1/2 mt-10 border-4 border-black"
          value={search}
          placeholder="Busca tu pokemon aqui"
          onChange={handleSearch}
        />
        <select
          value={type}
          onChange={handleSelectType}
          className="border-4 border-black"
        >
          <option value="">All</option>
          {pokemonTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-5 flex flex-row justify-center gap-5 ">
        <button
          className="border-2 p-2 bg-black text-white uppercase font-bold"
          onClick={previousPage}
        >
          Anterior
        </button>
        <h1 className="border-2 p-2 bg-black text-white font-bold">
          Página: {current} de {total}
        </h1>
        <button
          className="border-2 p-2 bg-black text-white uppercase font-bold"
          onClick={nextPage}
        >
          Siguiente
        </button>
      </div>
      <section>
        {pokemons ? (
          <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredPokemons()?.map((pokemon) => (
              <li key={pokemon.url}>
                <Link to={`${pokemon.url.split("/").at(-2)}`}>
                  <PokemonCard id={pokemon.url.split("/").at(-2)} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading</p>
        )}
      </section>
      <div className="my-5 flex flex-row justify-center gap-5">
        <button
          className="border-2 p-2 bg-black text-white uppercase font-bold"
          onClick={previousPage}
        >
          Anterior
        </button>
        <h1 className="border-2 p-2 bg-black text-white font-bold">
          Página: {current} de {total}
        </h1>
        <button
          className="border-2 p-2 bg-black text-white uppercase font-bold"
          onClick={nextPage}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Pokedex;
