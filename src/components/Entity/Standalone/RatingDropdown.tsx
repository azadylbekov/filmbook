import Dropdown from "react-bootstrap/Dropdown";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsTrash3, BsTrash3Fill } from "react-icons/bs";
import Rating from "react-rating";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import {
  useDeleteRatingMutation,
  useChangeRatingMutation,
} from "@/services/FilmBookService";
import { IMovie, IShow } from "@/types/types";
import { toast } from "react-toastify";
import { FC } from "react";

const TOAST_MESSAGES = {
  movie: {
    rank: {
      success: "Movie is successfully ranked!",
      error: "Movie could not be ranked! ",
    },
    delete: {
      success: "Movie rating successfully deleted!",
      error: "Movie ranking was not deleted! ",
    },
  },
  tv: {
    rank: {
      success: "Show is successfully ranked!",
      error: "Show could not be ranked! ",
    },
    delete: {
      success: "Show rating successfully deleted!",
      error: "Show ranking was not deleted! ",
    },
  },
};

interface RatingDropdownProps {
  entityId: string | number | undefined;
  type: "movie" | "tv";
}

const RatingDropdown: FC<RatingDropdownProps> = ({ entityId, type }) => {
  const ratingMovies = useAppSelector((state) => state.rating.movies);
  const ratingTv = useAppSelector((state) => state.rating.tv);

  const [rating, setRating] = useState<number>(0);
  const [isRatingDropOpen, setIsRatingDropOpen] = useState<boolean>(false);

  const guestSessionId = useAppSelector((state) => state.guestId.value);

  const [deleteRatingTrigger, deleteRatingData] = useDeleteRatingMutation();

  const [changeRatingTrigger, changeRatingData] = useChangeRatingMutation();

  useEffect(() => {
    if (type === "movie") {
      checkMovieRating();
    }
    if (type === "tv") {
      checkTvRating();
    }
  }, [entityId, ratingTv, ratingMovies]);

  const checkMovieRating = () => {
    const ratedMovieIndex = ratingMovies.findIndex(
      (movie: IMovie) => movie.id == entityId
    );
    if (ratedMovieIndex != -1) {
      setRating(ratingMovies[ratedMovieIndex].rating!);
    }
  };

  const checkTvRating = () => {
    const ratedTvIndex = ratingTv.findIndex(
      (show: IShow) => show.id == entityId
    );
    if (ratedTvIndex != -1) {
      setRating(ratingTv[ratedTvIndex].rating!);
    }
  };

  useEffect(() => {
    if (changeRatingData.status == "fulfilled") {
      if (changeRatingData.data.success) {
        toast.success(TOAST_MESSAGES[type].rank.success, {
          position: toast.POSITION.TOP_CENTER,
        });
        setRating(changeRatingData.originalArgs.body.value);
        setIsRatingDropOpen(false);
      }
    }
    if (changeRatingData.isError) {
      let errorText = TOAST_MESSAGES[type].rank.error;
      errorText += changeRatingData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [changeRatingData]);

  useEffect(() => {
    if (deleteRatingData.status == "fulfilled") {
      if (deleteRatingData.data.success) {
        toast.success(TOAST_MESSAGES[type].delete.success, {
          position: toast.POSITION.TOP_CENTER,
        });
        setRating(0);
        setIsRatingDropOpen(false);
      }
    }
    if (deleteRatingData.isError) {
      let errorText = TOAST_MESSAGES[type].delete.success;
      errorText += deleteRatingData.error.data.status_message;
      toast.error(errorText, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [deleteRatingData]);

  const ratingChangeHandler = (rating: number) => {
    const body = { value: rating };

    changeRatingTrigger({ id: entityId, guestSessionId, body, type });
  };

  const deleteRatingHandler = () => {
    deleteRatingTrigger({ guestSessionId, id: entityId, type });
  };

  return (
    <Dropdown
      drop="down-centered"
      show={isRatingDropOpen}
      onToggle={() => setIsRatingDropOpen(!isRatingDropOpen)}
    >
      <Dropdown.Toggle className="rounded-lg !bg-transparent hover:!bg-white hover:text-yellow-400 duration-300 px-3 py-2 border lg:ml-2 after:content-[none]">
        {rating > 0 ? (
          <FaStar className="text-2xl text-yellow-400" />
        ) : (
          <FaRegStar className="text-2xl text-[#000] dark:!text-[#fff] " />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className="py-3 !w-[350px]">
        <div className="flex items-center justify-center leading-none">
          <Rating
            emptySymbol={<FaRegStar className="text-3xl text-yellow-400" />}
            fullSymbol={<FaStar className="text-3xl text-yellow-400" />}
            fractions={2}
            stop={10}
            initialRating={rating}
            onChange={ratingChangeHandler}
          />
          <button
            onClick={deleteRatingHandler}
            className="group text-white-300 hover:text-red-400 duration-300 ml-2"
          >
            <BsTrash3 className="text-3xl group-hover:hidden block " />
            <BsTrash3Fill className="text-3xl hidden group-hover:block" />
          </button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RatingDropdown;
