import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import BrandsCard from "../../Components/Cards/BrandsCard";
export default function Brands() {
  function GetBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  function GetBrandspage2() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands?page=2");
  }

  const { data: dataPage1, isLoading: isLoadingPage1 } = useQuery({
    queryKey: ["BrandsPage1"],
    queryFn: GetBrands,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 8000,
    retry: Infinity,
    retryDelay: 7000,
  });
  const { data: dataPage2, isLoading: isLoadingPage2 } = useQuery({
    queryKey: ["BrandsPage2"],
    queryFn: GetBrandspage2,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 8000,
    retry: Infinity,
    retryDelay: 7000,
  });

  if (isLoadingPage1 || isLoadingPage2) return <Loading />;
  return (
    <div>
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className=" lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0 gap-3">
          {dataPage1?.data.data.map((category) => (
            <BrandsCard key={category._id} category={category} />
          ))}
          {dataPage2?.data.data.map((category) => (
            <BrandsCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
