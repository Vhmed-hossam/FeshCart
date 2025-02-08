import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Authcont } from "../Contexts/Authcontext";

function verifyToken(token) {
  // Logic to verify token
  return token === "valid-token"; // Example logic
}

export default function Protectedauthroutes({ children }) {
  const { IsloggedIn, setIsloggedIn } = useContext(Authcont);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && verifyToken(token)) {
      setIsloggedIn(true);
    } else {
      setIsloggedIn(false);
    }
  }, [setIsloggedIn]);

  return <>{!IsloggedIn ? children : <Navigate to="/" />}</>;
}
