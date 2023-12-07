import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import { useParams } from "react-router-dom";
import Credits from "@/components/Credits/Credits";
import Container from "@/components/Container";
import MovieGridUI from "@/components/MovieGrid/MovieGridUI";
import { useSelector } from "react-redux";
import { useDidMountEffect } from "@/hooks/useDidMountEffect";
import TrailerModal from "@/components/TrailerModal/TrailerModal";
import RatingDropdown from "@/components/RatingDropdown/RatingDropdown";
import MovieShowInfo from "@/components/MovieShowInfo/MovieShowInfo";
import MovieShowCover from "@/components/MovieShowCover/MovieShowCover";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetMovieByIdQuery,
  useGetSimilarMoviesQuery,
  useGetVideosQuery,
  useToggleFavoriteMutation,
  useDeleteRatingMutation,
  useToggleWatchlistMutation,
  useChangeRatingMutation,
} from "@/services/FilmBookService";
import MovieShowLoader from "@/components/MovieShowLoader/MovieShowLoader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieShowInfoSkeleton from "@/components/MovieShowInfo/MovieShowInfoSkeleton";


export default function Movie() {
  const { movieId } = useParams();

  const [trailer, setTrailer] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const favoriteMovies = useSelector((state) => state.favorite.movies);
  const [isFavorite, setIsFavorite] = useState(false);

  const watchlistMovies = useSelector((state) => state.watchlist.movies);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const [rating, setRating] = useState(0);
  const ratingMovies = useSelector((state) => state.rating.movies);
  const [isRatingDropOpen, setIsRatingDropOpen] = useState(false);

  const guestSessionId = useSelector((state) => state.guestId.value);

  const movieData = useGetMovieByIdQuery(movieId);
  const {
    data: movie,
    isFetching: isMovieLoading,
    error: movieError,
  } = movieData;

  const similarMoviesData = useGetSimilarMoviesQuery(movieId);
  const similarMovies = similarMoviesData?.data?.results;
  const { isLoading: isSimilarMoviesLoading, error: similarMoviesError } =
    similarMoviesData;

  const {
    data: videos,
    loading: areVideosLoading,
    error: videosError,
  } = useGetVideosQuery({ type: "movie", id: movieId });

  const [toggleFavoriteTrigger, toggleFavoriteData] =
    useToggleFavoriteMutation();

  const [toggleWatchlistTrigger, toggleWatchlistData] =
    useToggleWatchlistMutation();

  const [deleteRatingTrigger, deleteRatingData] = useDeleteRatingMutation();

  const [changeRatingTrigger, changeRatingData] = useChangeRatingMutation();

  useEffect(() => {
    if (!areVideosLoading && videos) {
      let trailer = videos.results.filter((item) => item.type == "Trailer")[0];
      setTrailer(trailer);
    }
  }, [areVideosLoading, videos]);

  useEffect(() => {
    checkFavorite();
    checkWatchlist();
    checkRating();
  }, [movieId]);

  useEffect(() => {
    checkFavorite();
    checkWatchlist();
    checkRating();
  }, [favoriteMovies, watchlistMovies, ratingMovies]);

  const checkFavorite = () => {
    if (favoriteMovies.findIndex((movie) => movie.id == movieId) != -1) {
      setIsFavorite(true);
    }
  };

  const checkWatchlist = () => {
    if (watchlistMovies.findIndex((movie) => movie.id == movieId) != -1) {
      setIsWatchlist(true);
    }
  };

  const checkRating = () => {
    const ratedMovieIndex = ratingMovies.findIndex(
      (movie) => movie.id == movieId
    );
    if (ratedMovieIndex != -1) {
      setRating(ratingMovies[ratedMovieIndex].rating);
    }
  };

  useEffect(() => {
    if (toggleFavoriteData.status == "fulfilled") {
      if (toggleFavoriteData.data.status_code === 1) {
        toast.success("Movie added to favorites list!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsFavorite(true);
      } else {
        toast.success("Movie deleted from favorites list!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsFavorite(false);
      }
    }
    if (toggleFavoriteData.isError) {
      let errorText = isFavorite
        ? "Movie was not added to favorites list! "
        : "Movie was not deleted from favorites list! ";
      errorText += toggleFavoriteData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [toggleFavoriteData]);

  useEffect(() => {
    if (toggleWatchlistData.status == "fulfilled") {
      if (toggleWatchlistData.data.status_code === 1) {
        toast.success("Movie added to watchlist!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsWatchlist(true);
      } else {
        toast.success("Movie deleted from watchlist!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsWatchlist(false);
      }
    }
    if (toggleWatchlistData.isError) {
      let errorText = isWatchlist
        ? "Movie was not added to watchlist! "
        : "Movie was not deleted from watchlist! ";
      errorText += toggleWatchlistData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [toggleWatchlistData]);

  useEffect(() => {
    console.log("changeMovieRatingData", changeRatingData);
    if (changeRatingData.status == "fulfilled") {
      if (changeRatingData.data.success) {
        toast.success("Movie is successfully ranked!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRating(changeRatingData.originalArgs.body.value);
        setIsRatingDropOpen(false);
      }
    }
    if (changeRatingData.isError) {
      let errorText = "Movie could not be ranked! ";
      errorText += changeRatingData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [changeRatingData]);

  useEffect(() => {
    if (deleteRatingData.status == "fulfilled") {
      if (deleteRatingData.data.success) {
        toast.success("Movie rating successfully deleted!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRating(0);
        setIsRatingDropOpen(false);
      }
    }
    if (deleteRatingData.isError) {
      let errorText = "Movie ranking was not deleted! ";
      errorText += deleteRatingData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [deleteRatingData]);

  const toggleWatchlist = () => {
    const body = {
      media_type: "movie",
      media_id: movieId,
      watchlist: !isWatchlist,
    };

    toggleWatchlistTrigger({ guestSessionId, body });
  };

  const toggleFavorite = () => {
    const body = {
      media_type: "movie",
      media_id: movieId,
      favorite: !isFavorite,
    };

    toggleFavoriteTrigger({ guestSessionId, body });
  };

  const ratingChangeHandler = (rating) => {
    const body = { value: rating };

    changeRatingTrigger({ id: movieId, guestSessionId, body, type: "movie" });
  };

  const deleteRatingHandler = () => {
    deleteRatingTrigger({ guestSessionId, id: movieId, type: "movie" });
  };

  return (
    <Layout>
      {!isMovieLoading && movie && (
        <div>
          <div className="relative movie-detail-poster">
            <div className="block pb-0 lg:!pb-[45%] "></div>
            <MovieShowCover backdrop={movie.backdrop_path} />
            <MovieShowInfo
              detail={movie}
              type="movie"
              setShowTrailer={setShowTrailer}
              trailer={trailer}
              isFavorite={isFavorite}
              toggleWatchlist={toggleWatchlist}
              addToFavorite={toggleFavorite}
              isWatchlist={isWatchlist}
            >
              <RatingDropdown
                isRatingDropOpen={isRatingDropOpen}
                setIsRatingDropOpen={setIsRatingDropOpen}
                rating={rating}
                ratingChangeHandler={ratingChangeHandler}
                deleteRatingHandler={deleteRatingHandler}
              />
            </MovieShowInfo>
          </div>
          <TrailerModal
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
            title={movie.title}
            trailer={trailer}
          />
        </div>
      )}
      {isMovieLoading && <MovieShowInfoSkeleton />}

      <Container>
        {movieError && <div className="mt-2"><ErrorMessage error={movieError} /></div>}
        {!isMovieLoading && movie && (
          <div className="lg:my-5 my-3">
            <h3 className="text-white lg:text-2xl text-xl lg:mb-5 mb-3">
              Overview
            </h3>
            <p className="text-white lg:text-xl text-md">{movie.overview}</p>
          </div>
        )}
      </Container>
      <Credits id={movieId} type="movie" />
      {!isSimilarMoviesLoading && similarMovies && (
        <div className="my-6">
          <Container>
            <a
              href="#"
              className="lg:text-2xl text-xl text-white lg:my-5 my-3 flex items-center group"
            >
              <span className="group-hover:mr-4 mr-2 duration-300">
                Similar movies
              </span>
            </a>
            <MovieGridUI isNav={true} movies={similarMovies} />
          </Container>
        </div>
      )}
      <ToastContainer />
    </Layout>
  );
}
