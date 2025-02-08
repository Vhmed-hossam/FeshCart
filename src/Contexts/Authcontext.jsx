import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export const Authcont = createContext();

export default function AuthContextProvider({ children }) {
  const [IsloggedIn, setIsloggedIn] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [UserId, setUserId] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (IsloggedIn) {
      Verifytoken();
    }
    if (token) {
      setIsloggedIn(true);
      Verifytoken();
    }
  }, [IsloggedIn]);

  function Verifytoken() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({data:{decoded : {id}}}) => {
        setIsloggedIn(true);
        setUserId(id);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setIsloggedIn(false);
        
      })
      .finally(() => setIsLoading(false));
  }

  const logout = () => {
    setIsloggedIn(false);
    localStorage.removeItem("token");
    Navigate("/login");
  };
  return (
    <Authcont.Provider value={{ IsloggedIn, setIsloggedIn, logout , IsLoading , UserId }}>
      {children}
    </Authcont.Provider>
  );
}