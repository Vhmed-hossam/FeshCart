import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import { Button, Input, Spinner } from "@heroui/react";
import RelatedP from "../../Components/RelatedProducts/RelatedProducts";
import { toast } from "react-toastify";
import { formatCurrency } from "../../helpers/currencyHelper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { StarY } from "../../Icons/Stars/StarYellow";

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
        console.log(data);
      });
  }

  function GetRelatedProducts(catID) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?category=` + catID)
      .then(({ data }) => {
        setRelatedProducts(data.data);
        setIsLoading(false);
        console.log(data);
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
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
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

  if (IsLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className=" flex justify-center items-center w-full px-4 py-8">
          <div className="align-center justify-center m-4">
            <Button
              isIconOnly
              variant="ghost"
              color="danger"
              onPress={() => navigate(-1)}
            >
              <Closeicon />
            </Button>
            <div className="w-full  p-2">
              <div className=" flex flex-row max-md:flex-col max-md:items-center gap-4 items-top justify-between">
                <div className="max-w-md">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    className="mt-4"
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                  >
                    <SwiperSlide>
                      <img
                        src={ProductDetails?.imageCover}
                        alt={ProductDetails?.slug}
                        className=""
                      />
                    </SwiperSlide>
                    {ProductDetails?.images?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={ProductDetails?.slug}
                          className="w-full h-auto rounded-lg"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="space-y-3 flex flex-col justify-around">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {ProductDetails?.title}
                  </h2>
                  <div className="flex items-center mb-4">
                    <StarY />
                    <span className="ml-2 text-gray-600">
                      {ProductDetails?.ratingsAverage} (
                      {ProductDetails?.ratingsQuantity} reviews)
                    </span>
                  </div>{" "}
                  <div>
                    {" "}
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold mr-0.5">Brand:</h2>
                      <span className="text-gray-600">
                        {ProductDetails?.brand?.name || "FeshCart"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold mr-0.5">
                        Category:
                      </h2>
                      <span className="text-gray-600">
                        {ProductDetails?.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    {ProductDetails?.priceAfterDiscount ? (
                      <>
                        <span className="text-2xl font-bold mr-2">
                          {formatCurrency(ProductDetails?.priceAfterDiscount)}
                        </span>
                        <span className="text-lg text-gray line-through">
                          {formatCurrency(ProductDetails?.price)}
                        </span>
                        <p className="text-green-500">
                          Saved{" "}
                          {formatCurrency(ProductDetails?.price - ProductDetails?.priceAfterDiscount)}
                        </p>
                      </>
                    ) : (
                      <span className="text-2xl font-bold mr-2">
                        {formatCurrency(ProductDetails?.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                {ProductDetails?.description}
              </p>
              <div className="mb-6 flex flex-col space-y-2">
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
                      <HeartIcon
                        filled={isProductInWishlist(ProductDetails._id)}
                      />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4b">
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
