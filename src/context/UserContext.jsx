import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") ?? ""
  );

  const saveUserName = (newUserName) => {
    setUserName(newUserName);
    localStorage.setItem("userName", newUserName);
  };

  const removeUserName = () => {
    setUserName("");
    localStorage.removeItem("userName");
  };
  return (
    <UserContext.Provider value={{ userName, saveUserName, removeUserName }}>
      {children}
    </UserContext.Provider>
  );
};
