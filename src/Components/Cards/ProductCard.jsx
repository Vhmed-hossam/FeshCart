import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../Services/CartServices";
import { StarG } from "../../Icons/Stars/StarGray";
import { StarY } from "../../Icons/Stars/StarYellow";
import { Halfstar } from "../../Icons/Stars/Halfstar";


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

                if (index === roundedRating + 1 && isHalf) {
                  return <Halfstar key={index} />;
                }
                if (index <= roundedRating) {
                  return <StarY key={index} />;
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
        <button
          className="btn text-primary transition-all hover:bg-primary hover:text-white w-full p-1.5 rounded-lg mt-1 border-primary border-2"
          isLoading={isLoading}
          onPress={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
