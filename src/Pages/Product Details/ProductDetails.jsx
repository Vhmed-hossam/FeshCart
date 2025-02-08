import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import { Button, Input, Spinner } from "@heroui/react";
import Slider from "react-slick";
import RelatedP from "../../Components/RelatedProducts/RelatedProducts";
import { StarY } from "../../Components/Cards/ProductCard";
import { toast } from "react-toastify";
import { formatCurrency } from "../../helpers/currencyHelper";

export const HeartIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};
export const Closeicon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};
export default function ProductDetails() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [ProductDetails, setProductDetails] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [IsAddingtofav, setIsAddingtofav] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    GetDetails();
  }, [id]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  function GetDetails() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products/" + id)
      .then(({ data }) => {
        GetRelatedProducts(data.data.category._id);
        setProductDetails(data.data);
        setIsLoading(false);
      });
  }

  function GetRelatedProducts(catID) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?category=` + catID)
      .then(({ data }) => {
        setRelatedProducts(data.data);
        setIsLoading(false);
      });
  }

  async function addToCart(productId) {
    setIsAddingToCart(true);
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
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error adding product to cart.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,

      });
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  }

  async function fetchWishlist() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  function isProductInWishlist(productId) {
    return wishlist.some((item) => item._id === productId);
  }

  async function removeFromWishlist(productId) {
    setIsAddingtofav(true);
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
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
      setIsFavourite(false);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    } finally {
      setIsAddingtofav(false);
    }
  }

  if (IsLoading) {
    return <Loading />;
  }

  function AddtoWishlist(productId) {
    setIsAddingtofav(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnFocusLoss: false,
        });
        setWishlist((prevWishlist) => [...prevWishlist, { _id: productId }]);
        setIsFavourite(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAddingtofav(false);
      });
  }
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row align-center justify-center m-4">
            <Button
              isIconOnly
              variant="ghost"
              color="danger"
              onPress={() => navigate(-2)}
              className="absolute top-4 right-4 md:relative md:top-0 md:right-0"
            >
              <Closeicon />
            </Button>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <Slider
                dots={true}
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                className="mt-4"
                arrows={true}
              >
                <img src={ProductDetails?.imageCover} alt={ProductDetails?.slug}></img>
                {ProductDetails?.images.map((image, index) => (
                  <div key={index} className="w-full h-auto rounded-lg">
                    <img
                      src={image}
                      alt={ProductDetails?.slug}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/3 px-4 flex items-center justify-center">
              <div className="h-fit">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {ProductDetails?.title}
                </h2>
                <div className="mt-4">
                  {ProductDetails?.priceAfterDiscount ? (
                    <>
                      <span className="text-2xl font-bold mr-2">
                        {formatCurrency(ProductDetails?.priceAfterDiscount)}
                      </span>
                      <span className="text-lg text-gray line-through">
                        {formatCurrency(ProductDetails?.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold mr-2">
                      {formatCurrency(ProductDetails?.price)}
                    </span>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  <StarY />
                  <span className="ml-2 text-gray-600">
                    {ProductDetails?.ratingsAverage} (
                    {ProductDetails?.ratingsQuantity} reviews)
                  </span>
                </div>
                <p className="text-gray-700 mb-6">
                  {ProductDetails?.description}
                </p>
                <div className="mb-6 flex flex-col space-y-2">
                  <div className="flex items-center">
                    <h2 className="text-lg font-semibold mr-0.5">Brand:</h2>
                    <span className="text-gray-600">
                      {ProductDetails?.brand.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-lg font-semibold mr-0.5">Category:</h2>
                    <span className="text-gray-600">
                      {ProductDetails?.category.name}
                    </span>
                  </div>
                </div>
                <div className="mb-6 flex items-center gap-4 px-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity:
                  </label>
                  <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    defaultValue="1"
                    className="w-16 rounded-md"
                    variant="bordered"
                    color="primary"
                    size="sm"
                  />
                </div>
                <div className="flex space-x-4 mb-6">
                  <Button
                    color="primary"
                    variant="ghost"
                    className="flex-1"
                    isLoading={isAddingToCart}
                    onPress={() => addToCart(ProductDetails._id)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    color="danger"
                    variant="flat"
                    isIconOnly
                    onPress={() => {
                      if (isProductInWishlist(ProductDetails._id)) {
                        removeFromWishlist(ProductDetails._id);
                      } else {
                        AddtoWishlist(ProductDetails._id);
                      }
                    }}
                  >
                    {IsAddingtofav ? (
                      <Spinner size="sm" color="danger" />
                    ) : (
                      <HeartIcon filled={isProductInWishlist(ProductDetails._id)} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <Button
              color="danger"
              variant="none"
              onPress={() =>
                navigate(`/related-products/${ProductDetails?.category._id}`)
              }
            >
              View All
            </Button>
          </div>
          <RelatedP products={RelatedProducts} />
        </div>
      </div>
    </>
  );
}
