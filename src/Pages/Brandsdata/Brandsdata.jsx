import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import ProductCard from "../../Components/Cards/ProductCard";
import { AcmeLogo } from "../Login/login";
export default function Brandsdata() {
  const { id } = useParams();

  function GetProductsByBrand() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ['Branddata'],
    queryFn: GetProductsByBrand,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 8000,
    retry: Infinity,
    retryDelay: 7000,
  });

  if (isLoading) return <Loading />;

  if (data?.data.data.length === 0) return <div className="p-12 text-center">
    <div className="w-fit mx-auto"><AcmeLogo/></div><h1 className="text-2xl text-primary font-bold">No products found</h1></div>;
  return (
    <div>
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0 gap-3">
          {data?.data.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}