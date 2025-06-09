import React from "react";
import { formatCurrency } from "../../helpers/currencyHelper";
import { StarY } from "../../Icons/Stars/StarYellow";

export default function OHCcard({ item }) {
  return (
    <>
      <div className=" p-6 rounded-lg shadow-md mt-4 col-span-1">
        <div className="flex gap-4">
          <img
            alt={item.product.title}
            className="w-36 h-36 object-cover rounded-sm"
            src={item.product.imageCover}
          />
          <div className="flex flex-col justify-between">
            <div className="gap-4 flex w-full justify-between items-center">
              <h2 className="font-semibold">{item.product.title}</h2>
              <div className="flex gap-2 items-center">
                <StarY />
                <p>{item.product.ratingsAverage}</p>
              </div>
            </div>
            <p className="text-gray-600">{formatCurrency(item.price)}</p>
            <p>Count : <span className="font-semibold">{item.count}</span></p>
            <p>Total: <span className="font-semibold">{formatCurrency(item.price * item.count)}</span></p>
          </div>
        </div>
      </div>
    </>
  );
}
