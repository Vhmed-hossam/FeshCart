import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/loading";
import { Button } from "@heroui/react";
import Card from "../Cards/ProductCard";

export default function RelatedProductsPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRelatedProducts();
  }, [categoryId]);

  function fetchRelatedProducts() {
    setIsLoading(true);
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
      )
      .then(({ data }) => {
        setRelatedProducts(data.data);
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        color="danger"
        className="mb-5"
        variant="bordered"
        isIconOnly
        onPress={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </Button>
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid gap-6 sm:grid-cols-1 sm:place-items-center md:grid-cols-2 xl:grid-cols-4 xs:place-items-center">
        {relatedProducts.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
