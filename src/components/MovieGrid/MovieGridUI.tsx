import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MovieCard from "@/components/MovieCard/MovieCard";
import "swiper/css";
import "swiper/css/navigation";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { IMovie } from "@/types/types";

interface MovieGridUIProps { 
  isNav: boolean,
  movies: IMovie[],
  isLoading: boolean
}

export default function MovieGridUI({ isNav, movies, isLoading }: MovieGridUIProps) {

  const skeletons = [0, 1, 2, 3, 4];

  return (
    <div className="md:min-h-[485px] min-h-[250px]">
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
        {isLoading && skeletons.map(skeleton => (
          <SwiperSlide key={skeleton}>
            <MovieCardSkeleton />
          </SwiperSlide>
        ))}

        {!isLoading && movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
