import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/currencyHelper";
import { StarY } from "../../Icons/Stars/StarYellow";

export default function WishlistCard({ PId, addToCart, removeFromWishlist }) {
  const [Loading, setLoading] = useState(false);
  const [IsRemovingW, setIsRemovingW] = useState(false);
  async function handleAddToCart(productId) {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  }

  async function RemoveW(productId) {
    setIsRemovingW(true);
    await removeFromWishlist(productId);
    setIsRemovingW(false);
  }
  return (
    <div>
      <Link to={`/product/${PId.id}`}>
        <img
          src={PId.imageCover}
          alt={PId?.slug}
          className="shadow-xs hover:shadow-lg transition-all rounded-md"
        />
        <div className="flex flex-row items-center justify-between mt-3">
          <h3 className="font-semibold text-gray-700 line-clamp-1 text-xl">
            {PId?.title}
          </h3>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <StarY />
            <p>{PId.ratingsAverage}</p>
          </div>
        </div>
        <p className="mt-1">
          {PId?.priceAfterDiscount ? (
            <>
              <span className="text-md mr-2 ">
                {formatCurrency(PId?.priceAfterDiscount)}
              </span>
              <span className="text-md text-gray line-through">
                {formatCurrency(PId?.price)}
              </span>
            </>
          ) : (
            <span className="text-md mr-2">{formatCurrency(PId?.price)}</span>
          )}
        </p>
      </Link>
      <div className="grid grid-cols-2 gap-3 px-2 pt-4">
        <button
          className="btn text-primary transition-all hover:bg-primary hover:text-white w-full p-1.5 rounded-lg mt-1 border-primary border-2"
          isLoading={Loading}
          onPress={() => handleAddToCart(PId._id)}
        >
          {Loading ? "" : "Add to cart"}
        </button>
        <button
          className="btn text-danger transition-all hover:bg-danger hover:text-white w-full p-1.5 rounded-lg mt-1 border-danger border-2"
          onPress={() => RemoveW(PId._id)}
          isLoading={IsRemovingW}
        >
          {IsRemovingW ? "" : "Delete"}
        </button>
      </div>
    </div>
  );
}
