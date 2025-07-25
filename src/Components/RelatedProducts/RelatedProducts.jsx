import React from "react";
import Card from "../Cards/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";


export default function RelatedProducts({ products }) {
  return (
    <div className="px-8">
      <Swiper
navigation={true} modules={[Navigation]}        spaceBetween={20}
        slidesPerView={1}
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
            spaceBetween: 20,
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