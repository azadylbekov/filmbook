import { FC, useState, useEffect } from "react";
import { formatDate } from "@/utils/functions";
import Skeleton from "react-loading-skeleton";
import moviePlaceholder from "@/assets/images/moviePlaceholder.png";
import { IMovie, IShow } from "@/types";

type MovieOrShow = IMovie | IShow;

interface SearchResultItemProps {
  result: MovieOrShow;
}

const SearchResultItem: FC<SearchResultItemProps> = ({ result }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isNoPoster, setIsNoPoster] = useState<boolean>(false);

  const movieImg = (result: MovieOrShow) => {
    return result.poster_path
      ? `https://image.tmdb.org/t/p/w92/${result.poster_path}`
      : moviePlaceholder;
  };

  useEffect(() => {
    if (!result.poster_path) {
      setIsNoPoster(true);
    }
  }, [result]);

  let title;
  function isMovie(obj: MovieOrShow): obj is IMovie {
    return "title" in obj;
  }

  if (isMovie(result)) {
    title = result.title;
  }
  if (!isMovie(result)) {
    title = result.name;
  }

  return (
    <div className="flex hover:!border-[#343434] border !border-transparent duration-3000 rounded items-center mb-2 p-1">
      <div className="h-20 mr-2 shrink-0">
        <img
          className={
            "object-cover h-full w-full " +
            (isLoaded ? "block" : "hidden") +
            (isNoPoster && " h-[79px] w-[56px]")
          }
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
        <h3 className="text-lg">{title}</h3>
        <h5 className="truncate">
          {result.original_title || result.original_name}{" "}
          {result.release_date && formatDate(result.release_date)}{" "}
          {result.first_air_date && formatDate(result.first_air_date)}
        </h5>
      </div>
    </div>
  );
};

export default SearchResultItem;
