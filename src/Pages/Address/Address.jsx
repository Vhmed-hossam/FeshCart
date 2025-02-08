import React from "react";
import { Input, Spinner } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FalseIcon, TrueIcon } from "../Signup/signup";
import { AcmeLogo } from "../Login/login";

export default function Address() {
  const [Isloading, setIsloading] = useState(false);
  const { cartId } = useParams();
  const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone Number is invalid"),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        details: "",
        phone: "",
        city: "",
      },
      onSubmit: Checkout,
      validationSchema,
    });
  function Checkout() {
    setIsloading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params: {
            url: "http://localhost:5173",
          },
        }
      )
      .then(({ data }) => {
        location.href = data.session.url;
      })
      .finally(() => {
        setIsloading(false);
      });
  }
  return (
    <div className="container py-6 w-2/3">
      <div className="row p-2">
        <div className="col-span-2 mx-auto p-8 grid place-content-center">
          <div className="grid grid-cols-2">
            <div className="col-span-2 grid place-content-center">
              <AcmeLogo />
            </div>
            <h3 className="col-span-2 font-bold text-primary">
              Enter Your Shipping Address
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
              label="details"
              isRequired
              type="text"
              variant="flat"
              name="details"
              value={values.details}
              onChange={handleChange}
              onBlur={handleBlur}
              endContent={
                values.details &&
                (errors.details ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.details && touched.details ? (
              <div className="text-danger">{errors.details}</div>
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
          <div className="col-span-2">
            <Input
              label="city"
              isRequired
              type="text"
              variant="flat"
              name="city"
              onChange={handleChange}
              value={values.city}
              onBlur={handleBlur}
              endContent={
                values.city && (errors.city ? <FalseIcon /> : <TrueIcon />)
              }
            />
            {errors.city && touched.city ? (
              <div className="text-danger">{errors.city}</div>
            ) : null}
          </div>

          <Button
            color="primary"
            variant="solid"
            type="submit"
            className="col-span-2 text-white text-lg p-7"
          >
            {Isloading ? <Spinner size="sm" color="white" /> : "Place Order"}
          </Button>
        </form>
        {errors.general && (
          <div className="text-danger text-center pt-2">{errors.general}</div>
        )}
      </div>
    </div>
  );
}
