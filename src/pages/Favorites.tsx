import Container from "@/components/Container";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyles";
import ShowCard from "@/components/ShowCard/ShowCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoriteMovies,
  setFavoriteTv,
} from "@/store/reducers/favoriteSlice";
import { useLazyGetFavoriteListQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";

const categoryOptions = [
  { label: "Movies", value: "movies" },
  { label: "Tv Series", value: "tv" },
];

export default function Favorites() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const dispatch = useDispatch();
  const guestSessionId = useSelector((state) => state.guestId.value);
  const [noMovies, setNoMovies] = useState(false);
  const [noShows, setNoShows] = useState(false);

  const [getFavoriteTrigger, favoriteListData] = useLazyGetFavoriteListQuery();
  const {
    data: favoriteList,
    isLoading: isFavoriteListLoading,
    error: favoriteListError,
  } = favoriteListData;

  useEffect(() => {
    getFavoriteList();
  }, [category]);

  useEffect(() => {
    if (!isFavoriteListLoading && favoriteListData.status == "fulfilled") {
      if (category.value == "movies") {
        setMovies(favoriteList.results);
        dispatch(setFavoriteMovies(favoriteList.results));
        setNoMovies(favoriteList.results.length === 0);
      } else {
        setShows(favoriteList.results);
        dispatch(setFavoriteTv(favoriteList.results));
        setNoShows(favoriteList.results.length === 0);
      }
    }
  }, [isFavoriteListLoading, favoriteListData]);

  const getFavoriteList = () => {
    getFavoriteTrigger({ guestSessionId, category: category.value });
  };

  const categoryChange = (category) => {
    setCategory(category);
  };

  return (
    <Container>
      <h3 className="text-white text-3xl mb-8 mt-10">Favorites</h3>
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
      {!isFavoriteListLoading && (
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
      {isFavoriteListLoading && <MovieGridSkeleton count={5} />}
      {category.value == "movies" && noMovies && (
        <h3 className="text-xl text-white">You have no favorite movies</h3>
      )}
      {category.value == "tv" && noShows && (
        <h3 className="text-xl text-white">You have no favorite tv series</h3>
      )}
      {favoriteListError && <ErrorMessage error={favoriteListError} />}
    </Container>
  );
}
