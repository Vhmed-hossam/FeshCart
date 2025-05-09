import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";

import Home from "./Pages/Home/home.jsx";
import Signup from "./Pages/Signup/signup.jsx";
import Login from "./Pages/Login/login.jsx";
import Brands from "./Pages/Brands/brands.jsx";
import Categories from "./Pages/Categories/categs.jsx";
import Cart from "./Pages/Cart/cart.jsx";
import ProductDetails from "./Pages/Product Details/ProductDetails.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import RelatedProductspage from "./Components/RelatedProducts/RelatedProductsPage.jsx";

import Layout from "./Components/Layouts/layout.jsx";

import ProtectedRoute from "./Auth/protectedroute.jsx";
import Protectedauthroutes from "./Auth/Protectedauthroutes.jsx";

import AuthContextProvider from "./Contexts/Authcontext.jsx";
import Address from "./Pages/Address/Address.jsx";
import OrdersHistory from "./Pages/OrdersHistory/OrdersHistory.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Wishlist from "./Pages/WishList/wishlist.jsx";
import LandingPage from "./Pages/Landing/Landing Page.jsx";
import Brandsdata from "./Pages/Brandsdata/Brandsdata.jsx";
import CategoriesData from "./Pages/CategoriesData/CategoriesData.jsx";
const queryclient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands/:id",
          element: (
            <ProtectedRoute>
              <Brandsdata />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories/:id",
          element: (
            <ProtectedRoute>
              <CategoriesData />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <Protectedauthroutes>
              <Login />
            </Protectedauthroutes>
          ),
        },
        {
          path: "/signup",
          element: (
            <Protectedauthroutes>
              <Signup />
            </Protectedauthroutes>
          ),
        },
        {
          path: "/address/:cartId",
          element: (
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/related-products/:categoryId",
          element: (
            <ProtectedRoute>
              <RelatedProductspage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <OrdersHistory />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <QueryClientProvider client={queryclient}>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </HeroUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
