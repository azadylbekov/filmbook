import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import movie1 from "@/assets/images/slider/movie1.jpg";
import movie2 from "@/assets/images/slider/movie2.jpg";
import movie3 from "@/assets/images/slider/movie3.jpg";
import movie4 from "@/assets/images/slider/movie4.jpg";
import { useGetPopularMoviesQuery } from "@/services/FilmBookService";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SliderItemSkeleton from "./SliderItemSkeleton";
import SliderItem from "./SliderItem";

const MOVIES = [
  {
    img: movie1,
  },
  {
    img: movie2,
  },
  {
    img: movie3,
  },
  {
    img: movie4,
  },
];

type movieType = {
  backdrop_path: string;
  original_title: string;
  overview: string;
  title?: string;
  id: string;
};

export default function HomeSlider() {
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
          {!areMoviesLoading && allMovies.map((movie: movieType, i: number) => (
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

{
  /* autoplay={{delay: 4000}} */
}
