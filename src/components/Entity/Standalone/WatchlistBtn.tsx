import { useState, useEffect, FC } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useToggleWatchlistMutation } from "@/services/FilmBookService";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { IMovie, IShow } from "@/types/types";

const TOAST_MESSAGES = {
  movie: {
    add: {
      success: "Movie added to watchlist!",
      error: "Movie was not added to watchlist! "
    },
    delete: {
      success: "Movie deleted from watchlist!",
      error: "Movie was not deleted from watchlist! "
    }
  },
  tv: {
    add: {
      success: "Show added to watchlist!",
      error: "Show was not added to watchlist! "
    },
    delete: {
      success: "Show deleted from watchlist!",
      error: "Show was not deleted from watchlist! "
    }
  }
}

interface WatchlistBtnProps {
  entityId: string | number,
  type: string
}

const WatchlistBtn: FC<WatchlistBtnProps> = ({ entityId, type }) => {
  const [isWatchlist, setIsWatchlist] = useState<boolean>(false);
  const guestSessionId = useAppSelector((state) => state.guestId.value);
  const watchlistMovies = useAppSelector((state) => state.watchlist.movies);
  const watchlistTv = useAppSelector((state) => state.watchlist.tv);

  const [toggleWatchlistTrigger, toggleWatchlistData] =
    useToggleWatchlistMutation();

  useEffect(() => {
    if (type === 'movie') {
      checkWatchlistMovie();
    }
    if (type === 'tv') {
      checkWatchlistTv();
    }
  }, [entityId]);

  const checkWatchlistMovie = () => {
    if (
      watchlistMovies.findIndex((movie: IMovie) => movie.id == entityId) != -1
    ) {
      setIsWatchlist(true);
    }
  };

  const checkWatchlistTv = () => {
    if (watchlistTv.findIndex((show: IShow) => show.id == entityId) != -1) {
      setIsWatchlist(true);
    }
  };

  useEffect(() => {
    if (toggleWatchlistData.status == "fulfilled") {
      if (toggleWatchlistData.data.status_code === 1) {
        toast.success(TOAST_MESSAGES[type].add.success, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsWatchlist(true);
      } else {
        toast.success(TOAST_MESSAGES[type].delete.success, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsWatchlist(false);
      }
    }
    if (toggleWatchlistData.isError) {
      let errorText = isWatchlist
        ? TOAST_MESSAGES[type].add.error
        : TOAST_MESSAGES[type].delete.error;
      errorText += toggleWatchlistData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [toggleWatchlistData]);

  const toggleWatchlist = () => {
    const body = {
      media_type: type,
      media_id: entityId,
      watchlist: !isWatchlist,
    };

    toggleWatchlistTrigger({ guestSessionId, body });
  };

  return (
    <button
      onClick={toggleWatchlist}
      className="rounded-lg hover:bg-white text-white-300 hover:text-yellow-600 duration-300 px-3 py-2 border lg:ml-2"
    >
      {isWatchlist && <FaBookmark className="text-2xl text-yellow-600" />}
      {!isWatchlist && <FaRegBookmark className="text-2xl " />}
    </button>
  );
};

export default WatchlistBtn;
