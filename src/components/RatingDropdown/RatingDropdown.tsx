import Dropdown from "react-bootstrap/Dropdown";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BsTrash3, BsTrash3Fill } from "react-icons/bs";
import Rating from "react-rating";


export default function RatingDropdown({
  isRatingDropOpen,
  setIsRatingDropOpen,
  rating,
  ratingChangeHandler,
  deleteRatingHandler,
}) {
  return (
    <Dropdown
      drop="down-centered"
      show={isRatingDropOpen}
      onToggle={() => setIsRatingDropOpen(!isRatingDropOpen)}
    >
      <Dropdown.Toggle className="rounded-lg !bg-transparent hover:!bg-white text-white-300 hover:text-yellow-400 duration-300 px-3 py-2 border lg:ml-2 after:content-[none]">
        {rating > 0 ? (
          <FaStar className="text-2xl text-yellow-400" />
        ) : (
          <FaRegStar className="text-2xl" />
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
}
