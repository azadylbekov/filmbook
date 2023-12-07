import Container from "@/components/Container";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyles";
import ShowCard from "@/components/ShowCard/ShowCard";
import { useDispatch } from "react-redux";
import {
  setWatchlistMovies,
  setWatchlistTv,
} from "@/store/reducers/watchlistSlice";
import { useLazyGetWatchlistQuery } from "@/services/FilmBookService";
import Spinner from "react-bootstrap/Spinner";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";


const categoryOptions = [
  { label: "Movies", value: "movies" },
  { label: "Tv Series", value: "tv" },
];

export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const dispatch = useDispatch();
  const guestSessionId = localStorage.getItem("guestSessionId");

  const [noMovies, setNoMovies] = useState(false);
  const [noShows, setNoShows] = useState(false);

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
        setNoMovies(watchlist.results.length === 0)
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

  const categoryChange = (category) => {
    setCategory(category);
  };

  return (
    <Layout>
      <Container>
        <h3 className="text-white text-3xl mb-8 mt-10">Watchlist</h3>
        <div className="flex gap-x-2 lg:flex-nowrap flex-wrap">
          <div className="md:w-auto w-full mb-2">
            <Select
              isSearchable={false}
              options={categoryOptions}
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
                  <MovieCard movie={movie} />
                </div>
              ))}
            {category.value == "tv" &&
              shows.map((show) => (
                <div className="mb-4" key={show.id}>
                  <ShowCard show={show} />
                </div>
              ))}
          </div>
        )}
        {/* {isWatchlistLoading && (
          <div className="flex items-center justify-center h-[300px]">
            <Spinner variant="light" animation="border" role="status"></Spinner>
          </div>
        )} */}
        {isWatchlistLoading && <MovieGridSkeleton count={5} />}
        {category.value == 'movies' && noMovies && (
          <h3 className="text-xl text-white">
            You have no movies in your watchlist
          </h3>
        )}
        {category.value == 'tv' && noShows && (
          <h3 className="text-xl text-white">
            You have no tv series in your watchlist
          </h3>
        )}
        {watchlistError && <ErrorMessage error={watchlistError} />}
      </Container>
    </Layout>
  );
}