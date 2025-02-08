import React, { useState , useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CartCards from "../../Components/Cards/CartData";
import Loading from "../../Components/Loading/loading";
import { Bounce, toast } from "react-toastify";
import CheckoutData from "../../Components/Checkout/CheckoutData";
import { Button, Spinner } from "@heroui/react";
import { Link } from "react-router-dom";
export const TrashIcon = ({ isLoading }) => {
  return isLoading ? (
    <Spinner size="sm" color="danger" />
  ) : (
    <svg viewBox="0 0 448 512" className="h-5 fill-danger">
      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
    </svg>
  );
};

export default function Cart() {
  const [CartItems, setCartItems] = useState([]);
  const [CData, setCData] = useState(null);
  const [DeletingItemId, setDeletingItemId] = useState(null);
  const [emptyingCart, setEmptyingCart] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["cartData"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      setCartItems(data.data.products);
      setCData(data);
    }
  }, [data]);

  async function DeleteItem(ProductId) {
    setDeletingItemId(ProductId);
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${ProductId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartItems(data.data.products);
      setCData(data);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    } finally {
      setDeletingItemId(null);
    }
    toast.success("Product deleted from cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      customProgressBar: () => <div className="bg-danger" />,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Bounce,
      Icons: { success: <TrashIcon /> },
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error fetching cart data</div>;
  }

  async function UpdateProductCount(ProductId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/` + ProductId,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartItems(data.data.products);
      setCData(data);
    
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  }

  async function EmptyCart() {
    setEmptyingCart(true);
    setDeletingItemId("all");
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

    
      setCartItems([]);
      setCData(null);
    } catch (error) {
      console.error("Error emptying the cart:", error);
    } finally {
      setDeletingItemId(null);
      setEmptyingCart(false);
    }
    toast("Cart emptied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      customProgressBar: () => <div className="bg-danger" />,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Bounce,
    });
  }

  if (CartItems.length === 0) {
    return (
      <>
        <div className="p-12 text-center space-y-4">
          <p>Your cart is empty</p>
          <Button variant="ghost" color="primary" as={Link} to="/">
            Shop For Products
          </Button>
        </div>
      </>
    );
  }

  return (
    <section className="p-12">
      <div className="w-full">
        <div className="w-full px-4 md:px-5 lg:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {CartItems?.map((item, index) => (
              <CartCards
                Carddata={item}
                key={index}
                DeleteItem={DeleteItem}
                isLoading={DeletingItemId === item.product._id}
                UpdateProductCount={UpdateProductCount}
              />
            ))}
            <Button
              color="danger"
              variant="bordered"
              onPress={EmptyCart}
              disabled={emptyingCart}
            >
              {emptyingCart ? (
                <Spinner size="sm" color="danger" />
              ) : (
                "Empty Cart"
              )}
            </Button>
          </div>
          <div>
            <CheckoutData
              key={CData?._id}
              CData={CData}
              UpdateProductCount={UpdateProductCount}
              cartId={CData?.cartId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}