import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

//to be able to use the values defined below in AuthContextProvider we created useAuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

//so we can use this value in the entire app
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    //convert string to object
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
