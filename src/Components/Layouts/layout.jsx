import React, { useContext } from "react";
import Navbar from "../Navbar/navbar.jsx"; 
import { Outlet } from "react-router-dom";
import Footer from "../Footer/footer.jsx"; 
import { Authcont } from "../../Contexts/Authcontext.jsx";
import Loading from "../Loading/loading.jsx";


export default function Layout() {
  const IsLoading = useContext(Authcont);
  return (
    <div>
      {IsLoading ? (
        <>
          <Navbar />
          <div>
            <Outlet />
          </div>
          <Footer />
        </>
      ) : (
        <Loading/>
      )}
    </div>
  );
}