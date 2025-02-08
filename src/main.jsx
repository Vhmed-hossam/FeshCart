import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";
import App from "./App.jsx";
import { CookiesProvider } from "react-cookie";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const rootel = ReactDOM.createRoot(document.getElementById("FeshCart"));
rootel.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);
