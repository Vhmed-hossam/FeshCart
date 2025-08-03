import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcont } from "../../Contexts/Authcontext";
import { FeshcartSmall } from "../../Icons/Logo/Feshcart";
export default function footer() {
  const { IsloggedIn } = useContext(Authcont);

  return (
    <footer className="bg-white rounded-lg shadow-xs  p-4">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <FeshcartSmall />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
                FeshCart
              </span>
            </a>
            <p className="text-gray-500">
              A library created with love by
              <a
                href="https://github.com/Vhmed-hossam"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vhmed
              </a>
            </p>
          </div>
          <div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
              <li>
                {IsloggedIn ? (
                  <Link
                    to={"/home"}
                    className="hover:underline me-4 md:me-6 text-black"
                  >
                    Home
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="hover:underline me-4 md:me-6 text-black"
                  >
                    Log In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
