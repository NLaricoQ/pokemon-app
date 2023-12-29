import { useEffect, useState } from "react";
import { getPokemonById } from "../services/getPokemonById";
import Loader from "./Loader";

const PokemonCard = ({ id }) => {
  const [pokemonData, setPokemonData] = useState(null);

  const [bgColor, setBgColor] = useState("");

  const targetStats = ["hp", "defense", "attack", "speed"];
  const stats = pokemonData?.stats.filter((stat) =>
    targetStats.includes(stat.stat.name)
  );
  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonData = await getPokemonById(id);
      setPokemonData(pokemonData);
      const backgroundName = pokemonData.types[0].type.name;
      if (backgroundName === "normal") {
        setBgColor("bg-slate-300");
      } else if (backgroundName === "fighting") {
        setBgColor("bg-amber-500");
      } else if (backgroundName === "flying") {
        setBgColor("bg-cyan-100");
      } else if (backgroundName === "poison") {
        setBgColor("bg-fuchsia-600");
      } else if (backgroundName === "ground") {
        setBgColor("bg-yellow-800");
      } else if (backgroundName === "rock") {
        setBgColor("bg-yellow-500");
      } else if (backgroundName === "bug") {
        setBgColor("bg-teal-800");
      } else if (backgroundName === "ghost") {
        setBgColor("bg-purple-950");
      } else if (backgroundName === "steel") {
        setBgColor("bg-gray-800");
      } else if (backgroundName === "fire") {
        setBgColor("bg-red-600");
      } else if (backgroundName === "water") {
        setBgColor("bg-sky-500");
      } else if (backgroundName === "grass") {
        setBgColor("bg-green-600");
      } else if (backgroundName === "electric") {
        setBgColor("bg-yellow-300");
      } else if (backgroundName === "psychic") {
        setBgColor("bg-fuchsia-300");
      } else if (backgroundName === "ice") {
        setBgColor("bg-sky-300");
      } else if (backgroundName === "dragon") {
        setBgColor("bg-blue-900");
      } else if (backgroundName === "dark") {
        setBgColor("bg-zinc-950");
      } else if (backgroundName === "fairy") {
        setBgColor("bg-fuchsia-200");
      } else if (backgroundName === "unknown") {
        setBgColor("bg-orange-950");
      } else if (backgroundName === "shadow") {
        setBgColor("bg-stone-600");
      }
    };

    loadPokemon();
  }, []);

  const name = pokemonData ? pokemonData.name.toUpperCase() : "";
  return (
    <>
      <article className="flex justify-center items-center">
        {!pokemonData && <Loader />}
        {pokemonData && (
          <div
            className={`flex flex-col content-center items-center m-5 rounded-2xl ${bgColor}`}
          >
            <div className="flex flex-col content-center items-center">
              <img
                className="w-3/4 mt-5"
                src={
                  pokemonData.sprites.other["official-artwork"].front_default
                    ? pokemonData.sprites.other["official-artwork"]
                        .front_default
                    : "https://i.pinimg.com/originals/46/e7/7e/46e77e3db6a6cdce8c63a9de331f31ff.png"
                }
              />
              <h1 className="font-bold text-3xl mb-3 text-white">
                {name} #{pokemonData.id}
              </h1>

              <div className="flex flex-row justify-evenly w-full">
                {pokemonData.types.map((pokemon) => (
                  <h1
                    key={pokemon.type.name}
                    className="text-xl border-2 bg-white px-3 py-2 rounded-lg"
                  >
                    {pokemon.type.name}
                  </h1>
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-7 m-5">
                {stats.map((stat) => (
                  <li key={stat.stat.name}>
                    <span className="text-white">
                      <span className="font-bold  text-white">
                        {stat.stat.name.toUpperCase()}
                      </span>{" "}
                      : {stat.base_stat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </article>
    </>
  );
};

export default PokemonCard;
