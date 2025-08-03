import OHCcard from "./OHCcard";
import { FalseIcon, TrueIcon } from "../../Pages/Signup/signup";
import { formatCurrency } from "../../helpers/currencyHelper";
import { FeshcartLogo } from "../../Icons/Logo/Feshcart";
export default function OrderHisotry({ item }) {
  return (
    <div className=" container p-5 border-b border-primary ">
      <div className=" flex flex-row justify-between">
        <h1 className="text-2xl font-bold">
          Order <span className="text-primary">#{item?.id}</span>
        </h1>
        <FeshcartLogo />
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
