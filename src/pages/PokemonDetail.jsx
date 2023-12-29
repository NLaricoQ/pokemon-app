import { Link, useParams } from "react-router-dom";
import { getPokemonById } from "../services/getPokemonById";
import { useEffect, useState } from "react";

import { getSpeciesById } from "../services/getSpecies";
import { getEvolutionChainById } from "../services/getPokemonEvolutionChain";
import Header from "../components/Header";

const PokemonDetail = () => {
  const { pokemonId } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [specie, setSpecie] = useState({});
  const [evolutionChain, setEvolutionChain] = useState({});
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState([]);
  const [varieties, setvarieties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await getPokemonById(pokemonId);
        setPokemon(pokemonData);

        const specieData = await getSpeciesById(pokemonId);
        setSpecie(specieData);

        if (specieData?.evolution_chain?.url) {
          const chainId = specieData.evolution_chain.url.split("/").at(-2);
          const res = await getEvolutionChainById(chainId);
          setEvolutionChain(res);
          const evol1 = res?.chain?.species;
          setFirst(evol1);
          if (res.chain.evolves_to?.length) {
            const evol2 = [];
            res.chain.evolves_to.map((e) => evol2.push(e));
            setSecond(evol2);
          }
        }
        if (specieData?.varieties?.length > 1) {
          const pokemonVarieties = specieData.varieties.map(
            (pokemon) => pokemon.pokemon
          );
          setvarieties(pokemonVarieties);
        } else setvarieties([]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [pokemonId]);

  return (
    <div className="flex flex-col bg-neutral-100 ">
      <Header />

      <div className="flex flex-col items-center ">
        <h1 className="uppercase font-bold text-3xl text-center my-10">
          {pokemon.name}
        </h1>
        <div className="flex flex-col md:flex-row items-center w-full justify-center ">
          <img
            className=" w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
            alt={pokemon.name}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          />
          <div className="flex flex-col mx-10 justify-center gap-5 items-center ">
            <div className="flex flex-row gap-5 w-full justify-center ">
              <div className="flex flex-col ">
                <h3 className="uppercase font-bold text-xl text-center">
                  height
                </h3>
                <p className="text-center">{pokemon.height / 10}m</p>
              </div>
              <div className="flex flex-col">
                <h3 className="uppercase font-bold text-xl text-center">
                  weight
                </h3>
                <p className="text-center">{pokemon.weight / 10}Kg</p>
              </div>
              {specie && (
                <div className="flex flex-col">
                  <h3 className="uppercase font-bold text-xl text-center">
                    habitat
                  </h3>
                  <p className="text-center">{specie?.habitat?.name}</p>
                </div>
              )}
            </div>

            <div className="flex flex-row gap-5 w-full justify-center">
              <div>
                <h2 className="uppercase font-bold text-xl text-center">
                  Type
                </h2>
                <ul>
                  {pokemon?.types?.map((e) => (
                    <li key={e.type.url}>
                      <p className="text-center">{e.type.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="uppercase font-bold text-xl text-center">
                  Abilities
                </h2>
                <ul>
                  {pokemon?.abilities?.map((e) => (
                    <li key={e.ability.url}>
                      <p className="text-center">{e.ability.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="uppercase font-bold text-xl text-center">
                  Moves
                </h2>
                <ul className="overflow-y-auto h-20">
                  {pokemon?.moves?.map((e) => (
                    <li key={e.move.url}>
                      <p className="text-center">{e.move.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {pokemon.sprites?.other?.["official-artwork"]?.front_shiny && (
          <div className="flex flex-col items-center w-full">
            <h2 className="uppercase font-bold text-2xl text-center">
              {`Shiny ${pokemon.name}`}
            </h2>
            <img
              className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
              src={pokemon.sprites.other["official-artwork"].front_shiny}
            />
          </div>
        )}
        {evolutionChain && (
          <h1 className="uppercase font-bold text-2xl text-center border-t-4 border-black mb-10 pt-10 w-full">
            Evolution chain: {evolutionChain.id}
          </h1>
        )}
        <div className="flex flex-col w-full items-center mb-10 ">
          {first && (
            <div className="flex flex-col h-full items-center w-full ">
              <Link
                to={`/pokedex/${first?.url?.split("/").at(-2)}`}
                className="w-full flex flex-col items-center"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${first?.url
                    ?.split("/")
                    .at(-2)}.png`}
                  className="sm:w-3/4 w-full md:w-1/2 lg:w-1/3"
                />
                <p className="uppercase font-bold text-2xl text-center">
                  {first?.name}
                </p>
              </Link>
            </div>
          )}
          {second && (
            <div className="w-full lg:flex lg:flex-wrap">
              {second.map((e, i) => (
                <div
                  key={i}
                  className="flex items-center flex-col md:flex-wrap w-full "
                >
                  <Link
                    to={`/pokedex/${e.species?.url?.split("/").at(-2)}`}
                    className="w-full flex flex-col items-center"
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.species?.url
                        ?.split("/")
                        .at(-2)}.png`}
                      className="sm:w-3/4 w-full md:w-1/2 lg:w-1/3"
                    />
                    <p className="uppercase font-bold text-2xl text-center">
                      {e.species?.name}
                    </p>
                  </Link>

                  <ul className="flex items-center w-full">
                    {e?.evolves_to?.length > 0 && (
                      <ul className="flex flex-row w-full items-center">
                        {e.evolves_to.map((e, i) => (
                          <li
                            key={i}
                            className="w-full flex flex-col items-center"
                          >
                            <Link
                              to={`/pokedex/${e.species?.url
                                ?.split("/")
                                .at(-2)}`}
                              className="w-full flex flex-col items-center "
                            >
                              <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.species?.url
                                  ?.split("/")
                                  .at(-2)}.png`}
                                className="sm:w-3/4 w-full md:w-1/2 lg:w-1/3"
                              />
                              <p className="uppercase font-bold text-2xl text-center">
                                {e.species?.name}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        {varieties.length > 1 && (
          <div className="flex flex-col border-t-4 border-black pt-10 w-full items-center">
            <h1 className="uppercase font-bold text-2xl text-center">
              Varieties
            </h1>
            <div className="flex flex-col items-center w-full">
              {varieties.map((pokemon) => (
                <div
                  key={pokemon.url}
                  className="w-full flex flex-col items-center"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.url
                      ?.split("/")
                      .at(-2)}.png`}
                    className="sm:w-3/4 w-full md:w-1/2 lg:w-1/3"
                  />
                  <p className="uppercase font-bold text-2xl text-center">
                    {pokemon?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;
