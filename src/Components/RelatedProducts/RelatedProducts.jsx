import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Cards/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


export default function RelatedProducts({ products }) {
  return (
    <div className="container px-12">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          1300: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          550: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
           <div className="w-full flex justify-center items-center"> <Card product={product} /></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}