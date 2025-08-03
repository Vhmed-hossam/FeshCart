import { Link } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BrandsCard({ category }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => {
      navigate(`/brands/${category._id}`)
    }}>
      <div>
        <div className="h-full flex flex-col group transition-all">
          <div className="relative h-full">
            <img
              src={category.image}
              alt="Collection of four insulated travel bottles on wooden shelf."
              className="
                rounded-lg shadow-md 
                object-cover
                max-sm:h-full sm:aspect-2/1 lg:aspect-square 
                hover:shadow-2xl transition duration-200 ease-in-out group-hover:shadow-primary/25"
            />
          </div>
          <div>
            <p className="text-base font-semibold px-3 pt-2 text-black group-hover:text-blue-500 transition-all duration-200 ease-in-out">
              {category.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
