import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ShowCard from "../ShowCard/ShowCard";


export default function MovieGridUI({ isNav, shows }) {
  return (
    <Swiper
      modules={[isNav && Navigation]}
      slidesPerView={5}
      spaceBetween={20}
      breakpoints={{
        1: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        960: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 5,
        },
      }}
      navigation={isNav}
      style={{ height: "100%" }}
    >
      {shows.map((show, index) => {
        return (
          <SwiperSlide key={index}>
            <ShowCard show={show} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
