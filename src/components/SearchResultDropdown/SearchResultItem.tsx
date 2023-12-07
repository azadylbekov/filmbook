import { useState } from "react";
import { formatDate } from "@/utils/functions";
import Skeleton from "react-loading-skeleton";
import moviePlaceholder from "@/assets/movie_placeholder.png";

export default function SearchResultItem({ result }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const movieImg = (result) => {
    return result.poster_path
      ? `https://image.tmdb.org/t/p/w92/${result.poster_path}`
      : moviePlaceholder;
  };

  return (
    <div className="flex hover:!border-[#343434] border !border-transparent duration-3000 rounded items-center mb-2 p-1">
      <div className="h-20 mr-2 shrink-0">
        <img
          className={"object-cover h-full w-full " + (isLoaded ? 'block' : 'hidden')}
          src={movieImg(result)}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <Skeleton
            className={"!rounded-none"}
            containerClassName=""
            width={53}
            height={79}
          />
        )}
      </div>
      <div className="grow-0">
        <h3 className="text-lg">{result.title || result.name}</h3>
        <h5>
          {result.original_title || result.original_name}{" "}
          {result.release_date && formatDate(result.release_date)}{" "}
          {result.first_air_date && formatDate(result.first_air_date)}
        </h5>
      </div>
    </div>
  );
}
