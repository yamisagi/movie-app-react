import React, { createContext, useContext } from "react";

// useContext içerisinde kullanabilmek için export ediyoruz.

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
