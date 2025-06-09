import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Authcont } from "../../Contexts/Authcontext";
import { HeartIcon } from "../../Pages/Product Details/ProductDetails";
import { verifyToken } from "../../Pages/Landing/Landing Page";
import { motion } from "framer-motion";

export const AcmeLogo = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      viewBox="0 0 144.000000 87.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,87.000000) scale(0.100000,-0.100000)"
        className="fill-primary"
        stroke="none"
      >
        <path
          d="M76 860 c-50 -9 -78 -44 -70 -85 8 -41 81 -185 220 
        -432 183 -326 206 -357 242 -321 20 20 14 41 -43 152 l-56 106 
        346 0 345 0 -23 -38 c-49 -77 -109 -201 -102 -211 11 -19 50 -12 
        72 11 73 80 423 726 423 781 0 16 -8 30 -19 37 -23 12 -1272 12 
        -1335 0z m1225 -87 c13 -13 1 -59 -31 -110 l-20 -33 -539 0 -539 
        0 -26 45 c-15 24 -29 58 -32 74 l-6 30 63 4 c35 2 301 3 591 3 385 
        -1 530 -4 539 -13z m-115 -246 c2 -2 -13 -35 -34 -73 l-37 -69 -405 
        0 -404 0 -38 65 c-21 35 -34 68 -30 72 4 4 54 9 112 11 125 5 830 0 836 -6z"
        />
      </g>
    </svg>
  );
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const NavItems = ["Home", "Categories", "Brands", "Cart"];
  const navigate = useNavigate();
  const { IsloggedIn, setIsloggedIn } = useContext(Authcont);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await verifyToken();
        setUserName(user.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (IsloggedIn) {
      fetchUserName();
    }
  }, [IsloggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsloggedIn(false);
  };
  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <nav className="bg-white shadow-md w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {IsloggedIn && (
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            )}
            <Link to="/" className="flex items-center">
              <AcmeLogo />
              <p className="font-bold text-primary ml-2">FeshCart</p>
            </Link>
          </div>

          {IsloggedIn && (
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              {NavItems.map((item, index) => (
                <NavLink
                  key={`${item}-${index}`}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-primary"
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-4">
            {IsloggedIn ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-10 w-10 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <motion.div
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <div className="px-4 py-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-10 w-10 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <p className="ml-3 text-sm font-medium text-gray-900">{userName}</p>
                    </div>
                    <Link
                      to="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </Link>
                  </motion.div>
                  )}
                </div>
                {/* Wishlist Button */}
                <Link
                  to="/wishlist"
                  className="p-2 border-2 border-red-500 rounded-md text-red-500 hover:bg-red-50"
                >
                  <HeartIcon filled={true} className="text-red-500" />
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {IsloggedIn && menuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NavItems.map((item, index) => (
              <NavLink
                key={`${item}-${index}`}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium ${
                    isActive ? "text-primary bg-gray-100" : "text-gray-600 hover:text-primary"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}