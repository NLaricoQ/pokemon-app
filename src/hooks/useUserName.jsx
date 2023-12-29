import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUserName = () => {
  return useContext(UserContext);
};

export default useUserName;
