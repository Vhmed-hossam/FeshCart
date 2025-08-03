import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { whyFeshCart } from "../../helpers/whyFeshCart";
import { FeshcartLogo } from "../../Icons/Logo/Feshcart";

export function verifyToken() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data: { decoded } }) => decoded)
    .catch((err) => {
      console.error("Token verification failed:", err);
      throw err;
    });
}

export default function LandingPage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    verifyToken().then((decoded) => {
      setUserName(decoded.name);
      console.log(decoded);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200 text-gray-800">
      <header className="w-full max-w-6xl mx-auto text-center py-20 px-4">
        <div className="mb-6 flex justify-center">
          <FeshcartLogo />
        </div>
        <h1 className="text-5xl font-extrabold">Welcome to FeshCart</h1>
        <p className="mt-2 text-xl">Hello {userName || "User"} !</p>
        <p className="mt-4 text-lg max-w-xl mx-auto">
          Discover an innovative shopping experience with top-quality products,
          seamless checkout, and secure delivery.
        </p>
      </header>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose FeshCart?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {whyFeshCart.map(([title, desc]) => (
              <div
                key={title}
                className="p-6 rounded-xl shadow-md bg-gray-50 text-center"
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Developer</h2>
          <p>
            Hi, I'm Vhmed – a passionate front-end developer focused on building
            modern, scalable, and beautiful interfaces for the web.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/Vhmed-hossam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition rounded-lg">
                GitHub
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-hossam-81260634a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition rounded-lg">
                LinkedIn
              </Button>
            </a>
            <a
              href="https://www.behance.net/Ahmed_Hossam16"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition rounded-lg">
                Behance
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
