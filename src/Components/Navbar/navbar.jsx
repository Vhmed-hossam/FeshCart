import React, { useContext, useState, useEffect } from "react";
import {
  Navbar as Nextuinavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Authcont } from "../../Contexts/Authcontext";
import { HeartIcon } from "../../Pages/Product Details/ProductDetails";
import { verifyToken } from "../../Pages/Landing/Landing Page";

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
  const [menuOpen, setmenuOpen] = useState(false);
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
  return (
    <Nextuinavbar onMenuOpenChange={setmenuOpen} shouldHideOnScroll>
      <NavbarContent>
        {IsloggedIn ? (
          <NavbarMenuToggle
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        ) : (
          ""
        )}
        <NavbarBrand>
          <Link to="/" className="flex items-center">
            <AcmeLogo />
            <p className="font-bold text-inherit text-primary m-0">FeshCart</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {IsloggedIn && (
        <NavbarContent justify="center" className="hidden sm:flex gap-4">
          {NavItems.map((item, index) => (
            <NavLink
              key={`${item}-${index}`}
              to={`/${item.toLowerCase()}`}
              color="foreground"
            >
              {item}
            </NavLink>
          ))}
        </NavbarContent>
      )}
      {IsloggedIn ? (
        <>
          <NavbarContent justify="end">
            <NavbarItem></NavbarItem>
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <div className="flex -space-x-2 overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900" id="yes">
                        {userName}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 mt-3 grid grid-cols-1 gap-3">
                    <Link onClick={handleLogout} className="text-danger">
                      Log Out
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              isIconOnly
              variant="bordered"
              color="danger"
              as={Link}
              to={"/wishlist"}
            >
              <HeartIcon filled={true} className="text-danger" />
            </Button>
          </NavbarContent>
        </>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              variant="ghost"
              color="primary"
              onPress={() => navigate("/login")}
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="primary"
              variant="solid"
              onPress={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {NavItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <NavLink
              className="w-full"
              to={`/${item.toLowerCase()}`}
              color="foreground"
            >
              {item}
            </NavLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Nextuinavbar>
  );
}