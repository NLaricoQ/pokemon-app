import { useNavigate } from "react-router-dom";
import useUserName from "../hooks/useUserName";
import usePokemons from "../hooks/usePokemon";

const Header = () => {
  const { removeUserName } = useUserName();
  const { setCurrentPage } = usePokemons();
  const navigate = useNavigate();

  const home = () => {
    setCurrentPage(0);
    navigate("/pokedex");
  };
  const logout = () => {
    removeUserName();
    navigate("/");
  };
  return (
    <div className="bg-red-500 h-20 lg:h-32 flex flex-row justify-between ">
      <button onClick={home}>
        <img
          className="h-full mx-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
        />
      </button>

      <button onClick={logout}>
        <img
          className="h-full mx-5"
          src="https://icons.veryicon.com/png/o/miscellaneous/unicons/exit-14.png"
        />
      </button>
    </div>
  );
};

export default Header;
