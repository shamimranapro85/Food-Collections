import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <div className="h-64 py-8 overflow-hidden rounded-lg">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper overflow-hidden rounded-md"
        >
          <SwiperSlide>
            <img
              className="flex rounded-md object-cover w-full"
              src="./image/1.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="flex rounded-md object-cover w-full"
              src="./image/2.jpg"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="flex rounded-md object-cover w-full"
              src="./image/3.jpg"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
