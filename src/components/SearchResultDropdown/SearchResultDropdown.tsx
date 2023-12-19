import { Link } from "react-router-dom";
import SearchResultSkeleton from "./SearchResultSkeleton";
import SearchResultItem from "./SearchResultItem";
import { FC } from "react";
import { IMovie, IShow } from "@/types";

interface SearchResultDropdownProps {
  searchResults: IMovie[] | IShow[];
  searchValue: string;
  extraClasses: string;
  isLoading: boolean;
}

type MovieOrShow = IMovie | IShow;

const SearchResultDropdown: FC<SearchResultDropdownProps> = ({
  searchResults,
  searchValue,
  extraClasses,
  isLoading,
}) => {
  const linkToMediaType = (result: MovieOrShow) => {
    return result.media_type == "tv"
      ? `/show/${result.id}`
      : `/movie/${result.id}`;
  };

  const noResults = searchResults.length === 0;

  return (
    <div
      style={{ zIndex: 1045 }}
      className={
        "absolute w-full min-h-[100px] p-[15px] bg-[#323232] rounded-[10px] border top-[45px] !border-[#424242] bg-black z-50 flex flex-col justify-center " +
        extraClasses
      }
    >
      {isLoading && <SearchResultSkeleton />}
      {!isLoading && (
        <>
          {!noResults &&
            searchResults.map((result) => (
              <Link to={linkToMediaType(result)} key={result.id}>
                <SearchResultItem result={result} />
              </Link>
            ))}
          {!noResults && (
            <Link
              className="hover:text-blue-400"
              to="/search"
              state={{ query: searchValue }}
            >
              All search results
            </Link>
          )}
          {noResults && (
            <h3 className="text-center">No results for "{searchValue}"</h3>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultDropdown;
