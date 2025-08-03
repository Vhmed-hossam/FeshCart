import React from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Authcont } from "../../Contexts/Authcontext";
import { useContext } from "react";
export const AcmeLogo = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
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
export const TrueIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 2 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-7 text-success"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
export const FalseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 2 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-7 text-danger"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
export default function Login() {
  const navigate = useNavigate();
  const [Isloading, setIsloading] = useState(false);
  const { setIsloggedIn } = useContext(Authcont);
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 29 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{9,19}$/,
        "Password must contain at least one uppercase letter and one number"
      ),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      setIsloading(true);

      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then((res) => {
          if (res.data.message === "success") {
            setIsloggedIn(true);
            localStorage.setItem("token", res.data.token);
          }
        })
        .catch((err) => {
          console.log(err);
          setFieldError(
            "general",
            err.response?.data?.message || "An error occurred"
          );
        })
        .finally(() => {
          setIsloading(false);
          navigate(location.pathname == "/login" ? "/" : location.pathname);
        });
    },
    validationSchema,
  });
  return (
    <div className="container p-6">
      <div className="row p-2">
        <div className="col-span-2 mx-auto p-8 grid place-content-center">
          <div className="grid grid-cols-2">
            <div className="col-span-2 grid place-content-center">
              <AcmeLogo />
            </div>
            <h3 className="col-span-2 font-bold text-primary">
              Login to your Account
            </h3>
          </div>
        </div>
        <form
          className="col-span-2 grid gap-5 grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div className="col-span-2">
            <Input
              label="Email"
              isRequired
              type="email"
              variant="flat"
              name="email"
              onChange={handleChange}
              value={values.email}
              onBlur={handleBlur}
              endContent={
                values.email &&
                (errors.email && touched.email ? <FalseIcon /> : <TrueIcon />)
              }
            />
            <div className="text-danger">{errors.email && touched.email}</div>
          </div>
          <div className="col-span-2">
            <Input
              label="Password"
              isRequired
              type="password"
              variant="flat"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              endContent={
                values.password &&
                (errors.password && touched.password ? (
                  <FalseIcon />
                ) : (
                  <TrueIcon />
                ))
              }
            />
            {errors.password ? (
              <div className="text-danger">
                {errors.password && touched.password}
              </div>
            ) : null}
          </div>
          <Button
            isLoading={Isloading}
            color="primary"
            variant="ghost"
            type="submit"
            className="col-span-2 p-7 text-lg"
          >
            Log in
          </Button>
        </form>
        {errors.general && (
          <div className="text-danger p-4 text-center">{errors.general}</div>
        )}
        <h1 className="w-fit inline-block mr-2 text-black">
          Don't have an account?
        </h1>
        <NavLink to={"/signup"} className="text-primary">
          Signup
        </NavLink>
      </div>
    </div>
  );
}
