import React, { useState } from "react";
import { Button, ButtonGroup, Input, Spinner } from "@heroui/react";
import { TrashIcon } from "../../Pages/Cart/cart";
import { formatCurrency } from "../../helpers/currencyHelper";
import { StarY } from "../../Icons/Stars/StarYellow";

export default function CartCards({
  Carddata,
  DeleteItem,
  UpdateProductCount,
}) {
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSubtracting, setIsSubtracting] = useState(false);
  const [productCount, setProductCount] = useState(Carddata.count);
  const [inputValue, setInputValue] = useState(Carddata.count);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  async function handleDelete(id) {
    setLoading(true);
    await DeleteItem(id);
    setLoading(false);
  }

  const handleUpdateCount = (id, count, isAdd) => {
    const newCount = Math.max(1, count); // Ensure count does not go below 1
    setProductCount(newCount);
    setInputValue(newCount);

    if (isAdd) {
      setIsAdding(true);
    } else {
      setIsSubtracting(true);
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(async () => {
      await UpdateProductCount(id, newCount);
      setIsAdding(false);
      setIsSubtracting(false);
    }, 500); // Delay the request by 500ms

    setDebounceTimeout(newTimeout);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numericValue = Math.max(1, parseInt(value, 10) || 1);
    setInputValue(value);

    if (!isNaN(value)) {
      handleUpdateCount(Carddata?.product._id, numericValue);
    }
  };

  return (
    <div className="rounded-3xl shadow-md p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 hover:shadow-lg transition-all">
      <div className="col-span-12 lg:col-span-2">
        <img
          src={Carddata?.product.imageCover}
          alt={Carddata?.product.title}
          className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
        />
      </div>

      <div className="col-span-12 lg:col-span-10 pl-4">
        <div className="flex items-center justify-between w-full mb-4">
          <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 line-clamp-2">
            {Carddata?.product.title}
          </h5>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarY />
              <p className="text-sm">{Carddata?.product.ratingsAverage}</p>
            </div>
            <Button
              variant="flat"
              isIconOnly
              color="danger"
              className="rounded-full p-2"
              onPress={() => handleDelete(Carddata?.product._id)}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" color="danger" /> : <TrashIcon />}
            </Button>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-4">
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              className="p-2"
              onPress={() =>
                handleUpdateCount(
                  Carddata?.product._id,
                  productCount - 1,
                  false
                )
              }
              disabled={isSubtracting}
            >
              <svg width={18} height={19} viewBox="0 0 18 19" fill="none">
                <path
                  d="M4.5 9.5H13.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <Input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              color="default"
              className="w-16 text-center"
              radius="none"
            />

            <Button
              variant="flat"
              color="primary"
              isIconOnly
              className="p-2"
              onPress={() =>
                handleUpdateCount(Carddata?.product._id, productCount + 1, true)
              }
              disabled={isAdding}
            >
              <svg width={18} height={19} viewBox="0 0 18 19" fill="none">
                <path
                  d="M3.75 9.5H14.25M9 14.75V4.25"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </ButtonGroup>
        </div>

        <h2 className="text-black font-manrope font-bold text-3xl leading-9 text-right">
          {formatCurrency(Carddata.price * productCount)}
        </h2>
      </div>
    </div>
  );
}