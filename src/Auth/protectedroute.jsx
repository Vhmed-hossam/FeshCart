import React, { useContext } from "react";
import { Authcont } from "../Contexts/Authcontext";
import Login from "../Pages/Login/login";

export default function ProtectedRoute({ children }) {
  const { IsloggedIn } = useContext(Authcont);

  return (
    <>
      {IsloggedIn ? (
        children
      ) : (
        <Login />
      )}
    </>
  );
}
