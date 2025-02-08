import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CategoriesCard from "../../Components/Cards/CategoriesCard";
import Loading from "../../Components/Loading/loading";

export default function Categories() {
  function GetCategories() {
    return  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategories,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 8000,
    retry: Infinity,
    retryDelay: 7000,
  });
  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="container max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className=" lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0 gap-5">
          {data?.data.data.map((category) => (
            <CategoriesCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}