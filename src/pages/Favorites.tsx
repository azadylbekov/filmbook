import Container from "@/components/Container";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyles";
import { useDispatch } from "react-redux";
import {
  setFavoriteMovies,
  setFavoriteTv,
} from "@/store/reducers/favoriteSlice";
import { useLazyGetFavoriteListQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { IMovie, IShow, ICategory } from "@/types";
import { CATEGORY_OPTIONS } from "@/constants/constants";
import { useAppSelector } from "@/store/hooks";
import EntityCard from "@/components/EntityCard/EntityCard";

const Favorites = () => {
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [shows, setShows] = useState<Array<IShow>>([]);
  const [category, setCategory] = useState<ICategory>(CATEGORY_OPTIONS[0]);
  const dispatch = useDispatch();
  const guestSessionId = useAppSelector((state) => state.guestId.value);
  const [noMovies, setNoMovies] = useState<boolean>(false);
  const [noShows, setNoShows] = useState<boolean>(false);

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
      if (category.value == "movies" && favoriteList) {
        setMovies(favoriteList.results);
        dispatch(setFavoriteMovies(favoriteList.results));
        setNoMovies(favoriteList.results.length === 0);
      }
      if (category.value == "tv" && favoriteList) {
        setShows(favoriteList.results);
        dispatch(setFavoriteTv(favoriteList.results));
        setNoShows(favoriteList.results.length === 0);
      }
    }
  }, [isFavoriteListLoading, favoriteListData]);

  const getFavoriteList = () => {
    getFavoriteTrigger({ guestSessionId, category: category.value });
  };

  const categoryChange = (category: any) => {
    setCategory(category);
  };

  return (
    <Container>
      <h3 className="dark:text-[#ffffff] text-[#000000] text-3xl mb-8 mt-10">Favorites</h3>
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
      {!isFavoriteListLoading && (
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
      {isFavoriteListLoading && <MovieGridSkeleton count={5} />}
      {category.value == "movies" && noMovies && (
        <h3 className="text-xl dark:text-[#ffffff] text-[#000000]">You have no favorite movies</h3>
      )}
      {category.value == "tv" && noShows && (
        <h3 className="text-xl dark:text-[#ffffff] text-[#000000]">You have no favorite tv series</h3>
      )}
      {favoriteListError && <ErrorMessage error={favoriteListError} />}
    </Container>
  );
}

export default Favorites;