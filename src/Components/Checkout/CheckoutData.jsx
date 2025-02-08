import { Button, Spinner } from "@heroui/react";
import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../helpers/currencyHelper";
import { Link } from "react-router-dom";

export default function CheckoutData({ CData }) {
  const [CartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (CData) {
      setCartId(CData._id);
    }
  }, [CData]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full sticky top-36">
        <div className="space-y-4 rounded-lg p-4 shadow-md  sm:p-6">
          <div className="flex flex-row justify-between">
            <p className="text-xl font-semibold text-gray-900 ">
              Number of Items
            </p>
            <p className="text-xl font-semibold text-gray-900 ">
              {CData?.numOfCartItems}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">
                  Price
                </dt>
                <dd className="text-base font-medium text-gray-900 ">
                  {formatCurrency(CData?.data?.totalCartPrice)}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4"></dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">
                  Tax
                </dt>
                <dd className="text-base font-medium text-gray-900 ">
                  {formatCurrency(5.99)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="space-y-4 rounded-lg p-4 shadow-md  sm:p-6">
          <dl className="flex items-center justify-between gap-4 pt-2">
            <dt className="text-base font-semibold text-gray-900 ">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 ">
              {formatCurrency((CData?.data?.totalCartPrice || 0) + 5.99)}
            </dd>
          </dl>
          <Button
            as={Link}
            to={`/address/${CData?.cartId}`}
            className="w-full"
            color="primary"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" color="primary" /> : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
