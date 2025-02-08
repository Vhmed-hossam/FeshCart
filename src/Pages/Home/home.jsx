import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../Components/Cards/ProductCard";
import Loading from "../../Components/Loading/loading";

async function fetchProducts(page = 1) {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products/?page=${page}`
  );
  return data.data;
}

function addToCart(productId) {
  const { data } = axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
}

export default function Home() {
  const {
    data: productsPage1,
    isLoading: isLoading1,
    error: error1,
  } = useQuery({ queryKey: ["products", 1], queryFn: () => fetchProducts(1) });
  const {
    data: productsPage2,
    isLoading: isLoading2,
    error: error2,
  } = useQuery({ queryKey: ["products", 2], queryFn: () => fetchProducts(2) });

  if (isLoading1 || isLoading2) {
    return <Loading />;
  }

  if (error1 || error2) {
    return <p className="text-red-500">Error loading products.</p>;
  }

  return (
    <div className="container p-6">
      <div className="grid gap-12 sm:grid-cols-1 sm:place-items-center md:grid-cols-2 xl:grid-cols-4 xs:place-items-center">
        {productsPage1.map((product, index) => {
          return (
            <div key={index} className="relative">
              <Card product={product} addToCart={addToCart} />
            </div>
          );
        })}
        {productsPage2.map((product, index) => {
          return (
            <div key={index} className="relative">
              <Card product={product} addToCart={addToCart} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
