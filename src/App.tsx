import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavoriteMovies,
  fetchFavoriteTv,
} from "@/store/reducers/favoriteSlice";
import {
  fetchWatchlistMovies,
  fetchWatchlistTv,
} from "@/store/reducers/watchlistSlice";
import { fetchRatingMovies, fetchRatingTv } from "@/store/reducers/ratingSlice";
import { setGuestId } from "@/store/reducers/guestIdSlice";
import { useGetMovieGenresQuery } from "@/services/FilmBookService";
import { setMovieGenres } from "@/store/reducers/genreSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Person from "./pages/Person";
import ScrollToTop from "./utils/ScrollToTop";
import TvSeries from "./pages/TvSeries";
import Show from "./pages/Show";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import RatingList from "./pages/RatingList";
import Layout from "./components/Layout/Layout";

function App() {
  const dispatch = useDispatch();
  const areFavoriteMoviesSet = useSelector(
    (state) => state.favorite.areFavoriteMoviesSet
  );
  const areFavoriteTvSet = useSelector((state) => state.favorite.isTvSet);

  const areWatchlistMoviesSet = useSelector(
    (state) => state.watchlist.areWatchlistMoviesSet
  );
  const areWatchlistTvSet = useSelector((state) => state.watchlist.isTvSet);

  const areRatingMoviesSet = useSelector(
    (state) => state.rating.areRatingMoviesSet
  );
  const areRatingTvSet = useSelector((state) => state.rating.isTvSet);

  const genresData = useGetMovieGenresQuery();
  const {
    data: genres,
    loading: areGenresLoading,
    error: genresError,
  } = genresData;

  useEffect(() => {
    if (!areGenresLoading && genres) {
      dispatch(setMovieGenres(genres.genres));
    }
  }, [areGenresLoading, genres]);

  useEffect(() => {
    if (!areFavoriteMoviesSet) {
      fetchFavoriteMoviesLocal();
    }
    if (!areFavoriteTvSet) {
      fetchFavoriteTvLocal();
    }
    if (!areWatchlistMoviesSet) {
      fetchWatchlistMoviesLocal();
    }
    if (!areWatchlistTvSet) {
      fetchWatchlistTvLocal();
    }
    if (!areRatingMoviesSet) {
      fetchRatingMoviesLocal();
    }
    if (!areRatingTvSet) {
      fetchRatingTvLocal();
    }

    dispatch(setGuestId());
  }, []);

  const fetchFavoriteMoviesLocal = () => {
    dispatch(fetchFavoriteMovies());
  };

  const fetchFavoriteTvLocal = () => {
    dispatch(fetchFavoriteTv());
  };

  const fetchWatchlistMoviesLocal = () => {
    dispatch(fetchWatchlistMovies());
  };

  const fetchWatchlistTvLocal = () => {
    dispatch(fetchWatchlistTv());
  };

  const fetchRatingMoviesLocal = () => {
    dispatch(fetchRatingMovies());
  };

  const fetchRatingTvLocal = () => {
    dispatch(fetchRatingTv());
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="search" element={<Search />} />
          <Route path="person/:personId" element={<Person />} />
          <Route path="tvseries" element={<TvSeries />} />
          <Route path="show/:showId" element={<Show />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="rated" element={<RatingList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
