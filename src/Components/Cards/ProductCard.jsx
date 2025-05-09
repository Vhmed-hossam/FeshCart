import React, { useState } from "react";
import { Button, Input, ButtonGroup, Spinner } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../Services/CartServices";

export const StarY = () => {
  return (
    <svg
      className="w-4 h-4 text-yellow-300"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534
       0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 
       1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 
       9.2a1.523 1.523 0 0 0 .387-1.575Z"
      />
    </svg>
  );
};
export const StarG = () => {
  return (
    <svg
      className="w-4 h-4 text-[#c0c3c8]"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534
       0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 
       1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 
       9.2a1.523 1.523 0 0 0 .387-1.575Z"
      />
    </svg>
  );
};
export const Halfstar = () => {
  return (
    <svg className="w-4 h-4" aria-hidden="true" viewBox="0 0 22 20">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="100%">
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#c0c3c8" />
        </linearGradient>
      </defs>
      <path
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 
        1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 
        3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 
        0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
        fill="url(#gradient)"
      />
    </svg>
  );
};

export default function Card({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function handleAddToCart() {
    setIsLoading(true);
    await addToCart(product._id);
    setIsLoading(false);
  }

  return (
    <div
      className="flex flex-col bg-white justify-around items-round max-w-sm border-gray-200 rounded-lg shadow-xs to-gray-100 hover:shadow-xl transition-all"
      key={product._id}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <Link to={"/product/" + product._id} className="">
        <div></div>
        <img
          className="p-8 rounded-t-lg"
          src={product.imageCover}
          alt="product image"
        />
        <div className="px-5 pb-1 ">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900  line-clamp-1 bg-500">
            {product.title}
          </h5>
          <div className="flex items-center mt-2.5 mb-5 ">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((index) => {
                const roundedRating = Math.floor(product.ratingsAverage);
                const isHalf = product.ratingsAverage % 1 >= 0.5;
                if (index < roundedRating) {
                  return <StarY key={index} />;
                }
                if (index === roundedRating && isHalf) {
                  return <Halfstar key={index} />;
                }
                return <StarG key={index} />;
              })}
            </div>
            <p className="text-gray-900  text-xs font-semibold px-2.5 py-0.5 rounded-xs">
              {product.ratingsAverage}
            </p>
          </div>
        </div>
      </Link>
      <div className="w-full justify-between px-5 pb-5">
        <Link
          to={`/product/${product.id}`}
          className="text-xl font-bold text-gray-900  flex-1 flex items-center justify-between"
        >
          {product?.priceAfterDiscount ? (
            <>
              <span className="text-2xl font-bold mr-2 text-gray-900 ">
                ${product?.priceAfterDiscount}
              </span>
              <span className="text-lg text-gray-500 font-normal line-through p-0">
                ${product?.price}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold mr-2 text-gray-900 ">
              ${product?.price}
            </span>
          )}
        </Link>
        <Button
          color="primary"
          radius="lg"
          variant="ghost"
          className="w-full"
          isLoading={isLoading}
          onPress={handleAddToCart}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
