import React from "react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AcmeLogo } from "../Login/login";
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
export default function Signup() {
  const navigate = useNavigate();
  const [Isloading, setIsloading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name is too short")
      .max(20, "Name is too long")
      .matches(
        /^(?=.*[A-Z])[A-Za-z0-9]+$/,
        "Name must contain at least one Uppercase letter"
      ),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(30, ".Password must be at most 29 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{9,19}$/,
        "Password must contain at least one uppercase letter and one number"
      ),
    rePassword: Yup.string()
      .required("Please enter the password again")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone  Number is invalid"),
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: () => {
      setIsloading(true);
      axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then((res) => {
          setIsloading(false);
          if (res.data.message === "success") {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          setFieldError(
            "general",
            err.response?.data?.message || "An error occurred"
          );
          setIsloading(false);
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
              Create an Account
            </h3>
          </div>
        </div>
        <form
          className="col-span-2 grid gap-5 grid-cols-2"
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        >
          <div className="col-span-2">
            <Input
              label="Name"
              isRequired
              type="text"
              variant="flat"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              endContent={
                values.name && (errors.name ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>
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
                values.email && (errors.email ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}
          </div>
          <div className="col-span-1">
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
                (errors.password ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.password && touched.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}
          </div>
          <div className="col-span-1">
            <Input
              label="rePassword"
              isRequired
              type="password"
              variant="flat"
              name="rePassword"
              value={values.rePassword}
              onChange={handleChange}
              onBlur={handleBlur}
              endContent={
                values.rePassword &&
                (errors.rePassword ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.rePassword && touched.rePassword ? (
              <div className="text-danger">{errors.rePassword}</div>
            ) : null}
          </div>
          <div className="col-span-2">
            <Input
              label="Phone"
              isRequired
              type="text"
              variant="flat"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              endContent={
                values.phone && (errors.phone ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.phone && touched.phone ? (
              <div className="text-danger">{errors.phone}</div>
            ) : null}
          </div>

          <Button
            isLoading={Isloading}
            color="primary"
            variant="ghost"
            type="submit"
            className="col-span-2 p-7 text-lg"
          >
            Create Account
          </Button>
        </form>
        {errors.general && (
          <div className="text-danger text-center pt-2">{errors.general}</div>
        )}
        <h1 className="w-fit inline-block mr-2 text-black">
          Already have an account?
        </h1>
        <NavLink to={"/login"} className="text-primary">
          Log In
        </NavLink>
      </div>
    </div>
  );
}
