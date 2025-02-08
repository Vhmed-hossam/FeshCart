import React from "react";
import OHCcard from "./OHCcard";
import { FalseIcon, TrueIcon } from "../../Pages/Signup/signup";
import { formatCurrency } from "../../helpers/currencyHelper";
export const AcmeLogo = () => {
  return (
     <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      viewBox="0 0 144.000000 87.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,87.000000) scale(0.100000,-0.100000)"
        className="fill-primary"
        stroke="none"
      >
        <path d="M76 860 c-50 -9 -78 -44 -70 -85 8 -41 81 -185 220 
        -432 183 -326 206 -357 242 -321 20 20 14 41 -43 152 l-56 106 
        346 0 345 0 -23 -38 c-49 -77 -109 -201 -102 -211 11 -19 50 -12 
        72 11 73 80 423 726 423 781 0 16 -8 30 -19 37 -23 12 -1272 12 
        -1335 0z m1225 -87 c13 -13 1 -59 -31 -110 l-20 -33 -539 0 -539 
        0 -26 45 c-15 24 -29 58 -32 74 l-6 30 63 4 c35 2 301 3 591 3 385 
        -1 530 -4 539 -13z m-115 -246 c2 -2 -13 -35 -34 -73 l-37 -69 -405 
        0 -404 0 -38 65 c-21 35 -34 68 -30 72 4 4 54 9 112 11 125 5 830 0 836 -6z" />
      </g>
    </svg>
  );
};
export default function OrderHisotry({ item }) {
  return (
    <div className=" container p-5 border-b border-primary ">
      <div className=" flex flex-row justify-between">
        <h1 className="text-2xl font-bold">
          Order <span className="text-primary">#{item?.id}</span>
        </h1>
        <AcmeLogo />
      </div>

      <p className="text-sm text-gray-500">
        Order placed <span className="font-medium">March 22, 2021</span>
      </p>
      <div className="grid grid-cols-2 gap-4">
        {item?.cartItems.map((item, index) => (
          <OHCcard item={item} key={index} />
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <div className="">
          <h3 className="font-semibold text-lg">Shipping To</h3>
          <p className="text-gray-500 text-sm">{item.shippingAddress.city}</p>
          <p className="text-gray-500 text-sm">
            {item.shippingAddress.details}
          </p>
        </div>
        <div className="pt-3 px-3 flex flex-row justify-between w-1/3">
          <div className="flex flex-row items-center ">
            <p className="text-sm">Paid: </p>
            {item.isPaid ? <TrueIcon /> : <FalseIcon />}
          </div>
          <div className="flex flex-row items-center ">
            <p className="text-sm">Delivered: </p>
            {item.isDelivered ? <TrueIcon /> : <FalseIcon />}
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <p className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(item?.totalOrderPrice)}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{formatCurrency(item?.shippingPrice)}</span>
        </p>
        <p className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatCurrency(item?.taxPrice)}</span>
        </p>
        <p className="flex justify-between text-lg font-semibold mt-2">
          <span>Order total</span>
          <span>
            {formatCurrency(
              item?.totalOrderPrice + item?.shippingPrice + item?.taxPrice
            )}
          </span>
        </p>
      </div>
    </div>
  );
}
