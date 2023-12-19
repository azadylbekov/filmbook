import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useGetPopularMoviesQuery } from "@/services/FilmBookService";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SliderItemSkeleton from "./SliderItemSkeleton";
import SliderItem from "./SliderItem";


const HomeSlider = () => {
  const skeletons = [0, 1, 2, 3, 4, 5];

  const moviesData = useGetPopularMoviesQuery();
  const {
    data: movies,
    isLoading: areMoviesLoading,
    error: moviesError,
  } = moviesData;

  const allMovies = movies?.results.slice(0, 10) || [];

  return (
    <div>
      <div className="flex items-center xl:h-[615px] lg:h-[505px] md:h-[439px] h-[329px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={20}
          navigation
          pagination
          initialSlide={1}
        >
          {areMoviesLoading && skeletons.map((skeleton) => (
            <SwiperSlide
              style={{ width: "1100px" }}
              className="w-full h-full"
              key={skeleton}
            >
              <SliderItemSkeleton />
            </SwiperSlide>
          ))}
          {!areMoviesLoading && allMovies.map((movie) => (
            <SwiperSlide
              style={{ width: "1100px" }}
              className="w-full h-full"
              key={movie.id}
            >
              <SliderItem movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;