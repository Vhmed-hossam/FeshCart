import React from "react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
export const BackIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
  );
};
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="bg-white">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-primary ">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-black  md:text-3xl">
            We can't find that page
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center mt-6 gap-x-3">
            <Button
              onPress={() => {
                navigate(-1);
              }}
              className="px-5 py-2 shrink-0 sm:w-auto"
              color="primary"
            >
              <BackIcon />
              <span>Go back</span>
            </Button>

            <Button
              onPress={() => navigate("/")}
              className=" px-5 py-2  text-white shrink-0 sm:w-auto"
              variant="solid"
              color="primary"
            >
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
