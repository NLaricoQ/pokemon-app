import { useState } from "react";
import useUserName from "../hooks/useUserName";
import { useNavigate } from "react-router-dom";
import usePokemons from "../hooks/usePokemon";

const Home = () => {
  const navigate = useNavigate();
  const { saveUserName } = useUserName();
  const { setCurrentPage } = usePokemons();

  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (name) {
      saveUserName(name);
      navigate("/pokedex");
    } else {
      setAlert(true);
    }
  };
  const handlePage = () => {
    setCurrentPage(0);
  };
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen  flex flex-col items-center justify-between "
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/featured/pokemon-hd-fazqcs1tmwwte1ap.jpg')",
        }}
      >
        <div className="rounded flex flex-col  items-center  bg-transparent fixed gap-5 mx-10 bottom-16">
          <h2 className="text-4xl text-black font-bold">Welcome Trainer!</h2>
          <form onSubmit={handleClick}>
            <div className="flex flex-col items-center gap-5">
              <label
                className="text-2xl text-black font-bold "
                htmlFor="username"
              >
                Write your name and start your adventure!
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black  rounded-sm p-2"
                id="username"
                placeholder="Your name here"
              />
            </div>
            {alert && (
              <p className="font-bold text-red-600">
                Necesitas escribir un nombre
              </p>
            )}
            <div className="flex items-center my-5 justify-center">
              <button
                onClick={handlePage}
                type="submit"
                className="bg-white p-2 font-bold"
              >
                Start Adventure!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
