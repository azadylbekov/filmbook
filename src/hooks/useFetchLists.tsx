import { useEffect} from "react";
import { setGuestId } from "@/store/reducers/guestIdSlice";
import { useGetMovieGenresQuery } from "@/services/FilmBookService";
import { setMovieGenres } from "@/store/reducers/genreSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useLazyGetFavoriteListQuery, useLazyGetWatchlistQuery, useLazyGetRatingListQuery } from "@/services/FilmBookService";


const useFetchLists = () => {
  const dispatch = useAppDispatch();
  const guestSessionId = useAppSelector((state) => state.guestId.value);

  const areFavoriteMoviesSet = useAppSelector(
    (state) => state.favorite.areMoviesSet
  );
  const areFavoriteTvSet = useAppSelector((state) => state.favorite.isTvSet);
  const areWatchlistMoviesSet = useAppSelector(
    (state) => state.watchlist.areMoviesSet
  );
  const areWatchlistTvSet = useAppSelector((state) => state.watchlist.isTvSet);

  const areRatingMoviesSet = useAppSelector(
    (state) => state.rating.areMoviesSet
  );
  const areRatingTvSet = useAppSelector((state) => state.rating.isTvSet);

	const [getFavoriteTrigger] = useLazyGetFavoriteListQuery();
  const [getWatchlistTrigger] = useLazyGetWatchlistQuery();
  const [ratingListTrigger] = useLazyGetRatingListQuery();

  const genresData = useGetMovieGenresQuery();
  const {
    data: genres,
    isLoading: areGenresLoading,
  } = genresData;

  useEffect(() => {
    if (!areGenresLoading && genres) {
      dispatch(setMovieGenres(genres.genres));
    }
  }, [areGenresLoading, genres]);

  useEffect(() => {
    if (!areFavoriteMoviesSet) {
			getFavoriteTrigger({ guestSessionId, category: 'movies' })
    }
    if (!areFavoriteTvSet) {
			getFavoriteTrigger({ guestSessionId, category: 'tv' })
    }
    if (!areWatchlistMoviesSet) {
			getWatchlistTrigger({ guestSessionId, category: 'movies' })
    }
    if (!areWatchlistTvSet) {
			getWatchlistTrigger({ guestSessionId, category: 'tv' })
    }
    if (!areRatingMoviesSet) {
			ratingListTrigger({ guestSessionId, category: 'movies' })
    }
    if (!areRatingTvSet) {
			ratingListTrigger({ guestSessionId, category: 'tv' })
    }

    dispatch(setGuestId());
  }, []);
};

export default useFetchLists;
