import { useState, useEffect, FC } from "react";
import { FaHeart } from "react-icons/fa";
import { useToggleFavoriteMutation } from "@/services/FilmBookService";
import { useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import { IMovie, IShow, ITrailer } from "@/types/types";



const TOAST_MESSAGES = {
  movie: {
    add: {
      success: "Movie added to favorites list!",
      error: "Movie was not added to favorites list! ",
    },
    delete: {
      success: "Movie deleted from favorites list!",
      error: "Movie was not deleted from favorites list! ",
    },
  },
  tv: {
    add: {
      success: "Show added to favorites list!",
      error: "Show was not added to favorites list! ",
    },
    delete: {
      success: "Show deleted from favorites list!",
      error: "Show was not deleted from favorites list! ",
    },
  },
};

interface FavoriteBtnProps {
  homepage?: string | undefined;
  trailer?: ITrailer | undefined;
  entityId: string | number;
  type: "movie" | "tv";
}

const FavoriteBtn: FC<FavoriteBtnProps> = ({
  homepage,
  trailer,
  entityId,
  type,
}) => {
  const guestSessionId = useAppSelector((state) => state.guestId.value);
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteMovies = useAppSelector((state) => state.favorite.movies);
  const favoriteTv = useAppSelector((state) => state.favorite.tv);

  useEffect(() => {
    if (type === "movie") {
      checkFavoriteMovie();
    }
    if (type === "tv") {
      checkFavoriteTv();
    }
  }, [entityId]);

  const checkFavoriteMovie = () => {
    if (
      favoriteMovies.findIndex((movie: IMovie) => movie.id == entityId) != -1
    ) {
      setIsFavorite(true);
    }
  };

  const checkFavoriteTv = () => {
    console.log("true");

    if (favoriteTv.findIndex((show: IShow) => show.id == entityId) != -1) {
      setIsFavorite(true);
    }
  };

  const [toggleFavoriteTrigger, toggleFavoriteData] =
    useToggleFavoriteMutation();

  useEffect(() => {
    if (toggleFavoriteData.status == "fulfilled") {
      if (toggleFavoriteData.data.status_code === 1) {
        toast.success(TOAST_MESSAGES[type].add.success, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsFavorite(true);
      } else {
        toast.success(TOAST_MESSAGES[type].delete.success, {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsFavorite(false);
      }
    }
    if (toggleFavoriteData.isError) {
      let errorText = isFavorite
        ? TOAST_MESSAGES[type].add.error
        : TOAST_MESSAGES[type].delete.error;
      errorText += toggleFavoriteData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [toggleFavoriteData]);

  const toggleFavorite = () => {
    const body = {
      media_type: type,
      media_id: entityId,
      favorite: !isFavorite,
    };

    toggleFavoriteTrigger({ guestSessionId, body });
  };

  return (
    <button
      onClick={toggleFavorite}
      className={
        "rounded-lg hover:bg-white text-white-300 hover:text-red-600 duration-300 px-3 py-2 border " +
        (!homepage && !trailer ? "" : "lg:ml-2")
      }
    >
      <FaHeart className={"text-2xl " + (isFavorite ? "text-red-600" : "")} />
    </button>
  );
};

export default FavoriteBtn;
