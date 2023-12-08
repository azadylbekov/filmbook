import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import Container from "@/components/Container";
import { useParams } from "react-router-dom";
import Credits from "@/components/Credits/Credits";
import ShowGridUI from "@/components/ShowGrid/ShowGridUI";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  useGetShowByIdQuery,
  useGetSimilarShowsQuery,
  useToggleFavoriteMutation,
  useToggleWatchlistMutation,
  useDeleteRatingMutation,
  useChangeRatingMutation,
  useGetVideosQuery,
} from "@/services/FilmBookService";
import MovieShowCover from "@/components/MovieShowCover/MovieShowCover";
import MovieShowInfo from "@/components/MovieShowInfo/MovieShowInfo";
import RatingDropdown from "@/components/RatingDropdown/RatingDropdown";
import TrailerModal from "@/components/TrailerModal/TrailerModal";
import MovieShowInfoSkeleton from "@/components/MovieShowInfo/MovieShowInfoSkeleton";

export default function Show() {
  const { showId } = useParams();

  const [trailer, setTrailer] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const favoriteTv = useSelector((state) => state.favorite.tv);
  const [isFavorite, setIsFavorite] = useState(false);

  const watchlistTv = useSelector((state) => state.watchlist.tv);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const ratingTv = useSelector((state) => state.rating.tv);
  const [rating, setRating] = useState(0);
  const [isRatingDropOpen, setIsRatingDropOpen] = useState(false);

  const guestSessionId = useSelector((state) => state.guestId.value);

  const showData = useGetShowByIdQuery(showId);
  const { data: show, isLoading: isShowLoading, error: showError } = showData;

  const similarShowsData = useGetSimilarShowsQuery(showId);
  const similarShows = similarShowsData?.data?.results;
  const { isLoading: isSimilarShowsLoading, error: similarShowsError } =
    similarShowsData;

  const {
    data: videos,
    isLoading: areVideosLoading,
    error: videosError,
  } = useGetVideosQuery({ type: "tv", id: showId });

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
  }, [showId]);

  useEffect(() => {
    checkFavorite();
    checkWatchlist();
    checkRating();
  }, [favoriteTv, watchlistTv, ratingTv]);

  const checkFavorite = () => {
    if (favoriteTv.findIndex((show) => show.id == showId) != -1) {
      setIsFavorite(true);
    }
  };

  const checkWatchlist = () => {
    if (watchlistTv.findIndex((show) => show.id == showId) != -1) {
      setIsWatchlist(true);
    }
  };

  const checkRating = () => {
    const ratedTvIndex = ratingTv.findIndex((show) => show.id == showId);
    if (ratedTvIndex != -1) {
      setRating(ratingTv[ratedTvIndex].rating);
    }
  };

  useEffect(() => {
    if (toggleFavoriteData.status == "fulfilled") {
      if (toggleFavoriteData.data.status_code === 1) {
        toast.success("Show added to favorites list!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsFavorite(true);
      } else {
        toast.success("Show deleted from favorites list!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsFavorite(false);
      }
    }
    if (toggleFavoriteData.isError) {
      let errorText = isFavorite
        ? "Show was not added to favorites list! "
        : "Show was not deleted from favorites list! ";
      errorText += toggleFavoriteData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [toggleFavoriteData]);

  useEffect(() => {
    if (toggleWatchlistData.status == "fulfilled") {
      if (toggleWatchlistData.data.status_code === 1) {
        toast.success("Show added to watchlist!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsWatchlist(true);
      } else {
        toast.success("Show deleted from watchlist!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsWatchlist(false);
      }
    }
    if (toggleWatchlistData.isError) {
      let errorText = isWatchlist
        ? "Show was not added to watchlist! "
        : "Show was not deleted from watchlist! ";
      errorText += toggleWatchlistData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [toggleWatchlistData]);

  useEffect(() => {
    if (changeRatingData.status == "fulfilled") {
      if (changeRatingData.data.success) {
        toast.success("Show is successfully ranked!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRating(changeRatingData.originalArgs.body.value);
        setIsRatingDropOpen(false);
      }
    }
    if (changeRatingData.isError) {
      let errorText = "Show could not be ranked! ";
      errorText += changeRatingData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [changeRatingData]);

  useEffect(() => {
    if (deleteRatingData.status == "fulfilled") {
      if (deleteRatingData.data.success) {
        toast.success("Show rating successfully deleted!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRating(0);
        setIsRatingDropOpen(false);
      }
    }
    if (deleteRatingData.isError) {
      let errorText = "Show ranking was not deleted! ";
      errorText += deleteRatingData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [deleteRatingData]);

  const toggleFavorite = () => {
    const body = {
      media_type: "tv",
      media_id: showId,
      favorite: !isFavorite,
    };

    toggleFavoriteTrigger({ guestSessionId, body });
  };

  const toggleWatchlist = () => {
    const body = {
      media_type: "tv",
      media_id: showId,
      watchlist: !isWatchlist,
    };

    toggleWatchlistTrigger({ guestSessionId, body });
  };

  const ratingChangeHandler = (rating) => {
    const body = { value: rating };

    changeRatingTrigger({ id: showId, guestSessionId, body, type: "tv" });
  };

  const deleteRatingHandler = () => {
    deleteRatingTrigger({ guestSessionId, id: showId, type: "tv" });
  };

  return (
    <>
      {!isShowLoading && show && (
        <div>
          <div className="relative movie-detail-poster">
            <div className="block pb-0 lg:!pb-[45%] "></div>
            <MovieShowCover backdrop={show.backdrop_path} />
            <MovieShowInfo
              detail={show}
              type="show"
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
            title={show.name}
            trailer={trailer}
          />
        </div>
      )}
      {isShowLoading && <MovieShowInfoSkeleton />}
      <Container>
        {!isShowLoading && show && (
          <div className="lg:my-5 my-3">
            <h3 className="text-white lg:text-2xl text-xl lg:mb-5 mb-3">
              Overview
            </h3>
            <p className="text-white lg:text-xl text-md">{show.overview}</p>
          </div>
        )}
      </Container>
      <Credits id={showId} type="tv" />
      {!isSimilarShowsLoading && similarShows.length && (
        <div className="my-6">
          <Container>
            <a
              href="#"
              className="lg:text-2xl text-xl text-white lg:my-5 my-3 flex items-center group"
            >
              <span className="group-hover:mr-4 mr-2 duration-300">
                Similar TV Series
              </span>
            </a>
            <ShowGridUI isNav={true} shows={similarShows} />
          </Container>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
