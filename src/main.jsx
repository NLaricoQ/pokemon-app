import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import { PokemonProvider } from "./context/PokemonContext.jsx";
import { RouterProvider } from "react-router-dom";
import { route } from "./route/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <PokemonProvider>
        <RouterProvider router={route} />
      </PokemonProvider>
    </UserProvider>
  </React.StrictMode>
);
