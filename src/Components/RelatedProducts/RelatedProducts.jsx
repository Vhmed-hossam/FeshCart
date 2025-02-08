import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Cards/ProductCard";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  className: "container px-12",
  initialSlide: 0,
  centerMode: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",  fontSize: "24px" }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#007ddd"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3H8.25M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", fontSize: "32px" }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#fff"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#007ddd"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
        />
      </svg>
    </div>
  );
}

export default function RelatedProducts({ products }) {
  return (
    <Slider {...settings} className="">
      {products.map((product, index) => (
        <Card product={product} key={index} />
      ))}
    </Slider>
  );
}
