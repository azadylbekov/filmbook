import { IMovie } from "@/types";
import { FC } from "react";
import { Link } from "react-router-dom";

interface SliderItemProps {
  movie: IMovie
}

const SliderItem: FC<SliderItemProps> = ({ movie }) => {
  return (
    <div className="w-full relative xl:pt-[56%] lg:pt-[46%] md:pt-[40%] pt-[30%] overflow-hidden">
      <Link to={`movie/${movie.id}`}>
        <img
          className="w-full h-full absolute block object-contain md:object-cover top-0 left-0 right-0 bottom-0"
          src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt=""
        />
        <div className="swiper-movie-overlay duration-300 absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10">
          <div className="swiper-movie-overlay__text absolute xl:p-10 md:px-60 px-[390px] py-10 text-white">
            <h3 className="xl:text-2xl text-lg">{movie.original_title}</h3>
            <p className="xl:text-lg text-sm md:block hidden">
              {movie.overview}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SliderItem;
