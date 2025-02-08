import React from "react";
import { Link } from "react-router-dom";

export default function CategoriesCard({ category }) {
  return (
    <>
      <Link to={`/categories/${category._id}`}>
        <div>
          <div className="h-full flex flex-col group transition-all">
            <div className="relative h-full">
              <img
                src={category.image}
                alt="Collection of four insulated travel bottles on wooden shelf."
                className="w-full 
                      rounded-lg  shadow-md 
                      object-cover
                      max-sm:h-full sm:aspect-2/1 lg:aspect-square 
                      hover:shadow-2xl transition duration-200 ease-in-out group-hover:shadow-primary/25"
                onClick={() => {}}
              />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900 px-3 pt-2 text-black group-hover:text-blue-500 transition-all duration-200 ease-in-out">
                {category.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}