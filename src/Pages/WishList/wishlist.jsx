import React from "react";
import WishlistCard from "../../Components/Cards/WishlistCard";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";

export default function Wishlist() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data.data;
    },
    staleTime: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
    refetchInterval: 8000,
    retry: Infinity,
    retryDelay: 7000,
  });

  const addToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message, {
        transition: Bounce,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        transition: Bounce,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
    }
  };

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnFocusLoss: false,
      });
      queryClient.invalidateQueries(["wishlist"]);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  }

  if (isLoading) return <Loading />;
  return (
    <div className=" py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
       <div className="flex flex-row justify-between items-center px-12"><h1 className="text-2xl">Your WishList</h1><p className="text-2xl">{data.length}</p></div> 
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {data.map((PId) => (
            <WishlistCard key={PId._id} PId={PId} addToCart={addToCart} removeFromWishlist={removeFromWishlist} />
          ))}
        </div>
      </div>
    </div>
  );
}
