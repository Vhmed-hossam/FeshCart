import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../Auth/protectedroute";
import Layout from "../Components/Layouts/layout";
import ProductDetails from "../Pages/Product Details/ProductDetails";
import RelatedProductsPage from "../Components/RelatedProducts/RelatedProductsPage";
import OrdersHistory from "../Pages/OrdersHistory/OrdersHistory";
import Protectedauthroutes from "../Auth/Protectedauthroutes";
import LandingPage from "../Pages/Landing/Landing Page";
import Home from "../Pages/Home/home";
import Brands from "../Pages/Brands/brands";
import Brandsdata from "../Pages/Brandsdata/Brandsdata";
import Categories from "../Pages/Categories/categs";
import CategoriesData from "../Pages/CategoriesData/CategoriesData";
import Cart from "../Pages/Cart/cart";
import Wishlist from "../Pages/WishList/wishlist";
import Login from "../Pages/Login/login";
import Signup from "../Pages/Signup/signup";
import Address from "../Pages/Address/Address";
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
              <RelatedProductsPage />
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
      element: <Navigate to="/" />,
    },
  ]);

  export default router