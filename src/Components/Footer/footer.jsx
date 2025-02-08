import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Authcont } from "../../Contexts/Authcontext";
export const AcmeLogo = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="40pt"
      height="40pt"
      viewBox="0 0 144.000000 87.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,87.000000) scale(0.100000,-0.100000)"
        className="fill-primary"
        stroke="none"
      >
        <path d="M76 860 c-50 -9 -78 -44 -70 -85 8 -41 81 -185 220 -432 183 -326 206 -357 242 -321 20 20 14 41 -43 152 l-56 106 346 0 345 0 -23 -38 c-49 -77 -109 -201 -102 -211 11 -19 50 -12 72 11 73 80 423 726 423 781 0 16 -8 30 -19 37 -23 12 -1272 12 -1335 0z m1225 -87 c13 -13 1 -59 -31 -110 l-20 -33 -539 0 -539 0 -26 45 c-15 24 -29 58 -32 74 l-6 30 63 4 c35 2 301 3 591 3 385 -1 530 -4 539 -13z m-115 -246 c2 -2 -13 -35 -34 -73 l-37 -69 -405 0 -404 0 -38 65 c-21 35 -34 68 -30 72 4 4 54 9 112 11 125 5 830 0 836 -6z" />
      </g>
    </svg>
  );
};

export default function footer() {
    const { IsloggedIn } = useContext(Authcont);
  
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4 p-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <AcmeLogo />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary">
              FeshCart
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
{IsloggedIn ? (
                <Link to={"/home"} className="hover:underline me-4 md:me-6 text-black">
                Home
              </Link>
            ) : (
                <Link to={"/login"} className="hover:underline me-4 md:me-6 text-black">
                Log In
              </Link>
)}
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {new Date().getFullYear()}
          <a href="/" className="hover:underline">
            FeshCart™ bg Vhmed
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}