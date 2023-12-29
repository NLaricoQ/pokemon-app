import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Pokedex from "../pages/Pokedex";
import PokemonDetail from "../pages/PokemonDetail";
import ProtectedRoute from "../layouts/ProtectedRoute";
import Layout from "../layouts/Layout";
import { pokemonLoader } from "./loaders/pokedexLoader";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokedex",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Pokedex />,
        loader: pokemonLoader,
      },
      {
        path: ":pokemonId",
        element: <PokemonDetail />,
      },
    ],
  },
]);
