import Container from "@/components/Container";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyles";
import { useDispatch } from "react-redux";
import {
  setWatchlistMovies,
  setWatchlistTv,
} from "@/store/reducers/watchlistSlice";
import { useLazyGetWatchlistQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { ICategory, IMovie, IShow } from "@/types/types";
import { CATEGORY_OPTIONS } from "@/constants/const";
import EntityCard from "@/components/EntityCard/EntityCard";

const Watchlist = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [shows, setShows] = useState<IShow[]>([]);
  const [category, setCategory] = useState<ICategory>(CATEGORY_OPTIONS[0]);
  const dispatch = useDispatch();
  const guestSessionId = localStorage.getItem("guestSessionId");

  const [noMovies, setNoMovies] = useState<boolean>(false);
  const [noShows, setNoShows] = useState<boolean>(false);

  const [getWatchlistTrigger, watchlistData] = useLazyGetWatchlistQuery();
  const {
    data: watchlist,
    isLoading: isWatchlistLoading,
    error: watchlistError,
  } = watchlistData;

  useEffect(() => {
    getWatchlist();
  }, [category]);

  useEffect(() => {
    if (!isWatchlistLoading && watchlistData.status == "fulfilled") {
      if (category.value == "movies") {
        setMovies(watchlist.results);
        dispatch(setWatchlistMovies(watchlist.results));
        setNoMovies(watchlist.results.length === 0);
      } else {
        setShows(watchlist.results);
        dispatch(setWatchlistTv(watchlist.results));
        setNoShows(watchlist.results.length === 0);
      }
    }
  }, [isWatchlistLoading, watchlistData]);

  const getWatchlist = () => {
    getWatchlistTrigger({ guestSessionId, category: category.value });
  };

  const categoryChange = (category: any) => {
    setCategory(category);
  };

  return (
    <>
      <Container>
        <h3 className="dark:text-[#ffffff] text-[#000000] text-3xl mb-8 mt-10">
          Watchlist
        </h3>
        <div className="flex gap-x-2 lg:flex-nowrap flex-wrap">
          <div className="md:w-auto w-full mb-2">
            <Select
              isSearchable={false}
              options={CATEGORY_OPTIONS}
              styles={customStyles}
              value={category}
              onChange={categoryChange}
              placeholder="Genres"
            />
          </div>
        </div>
        {!isWatchlistLoading && (
          <div className="lg:mt-5 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
            {category.value == "movies" &&
              movies.map((movie) => (
                <div className="mb-4" key={movie.id}>
                  <EntityCard type="movie" entity={movie} />
                </div>
              ))}
            {category.value == "tv" &&
              shows.map((show) => (
                <div className="mb-4" key={show.id}>
                  <EntityCard type="show" entity={show} />
                </div>
              ))}
          </div>
        )}
        {isWatchlistLoading && <MovieGridSkeleton count={5} />}
        {category.value == "movies" && noMovies && (
          <h3 className="text-xl dark:text-[#ffffff] text-[#000000]">
            You have no movies in your watchlist
          </h3>
        )}
        {category.value == "tv" && noShows && (
          <h3 className="text-xl dark:text-[#ffffff] text-[#000000]">
            You have no tv series in your watchlist
          </h3>
        )}
        {watchlistError && <ErrorMessage error={watchlistError} />}
      </Container>
    </>
  );
};

export default Watchlist;
