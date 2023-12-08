import Container from "@/components/Container";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyles";
import ShowCard from "@/components/ShowCard/ShowCard";
import { useDispatch, useSelector } from "react-redux";
import { setRatingMovies, setRatingTv } from "@/store/reducers/ratingSlice";
import { useLazyGetRatingListQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";

const categoryOptions = [
  { label: "Movies", value: "movies" },
  { label: "Tv Series", value: "tv" },
];

export default function RatingList() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const dispatch = useDispatch();
  const guestSessionId = useSelector((state) => state.guestId.value);

  const [noMovies, setNoMovies] = useState(false);
  const [noShows, setNoShows] = useState(false);

  const [ratingListTrigger, ratingListData] = useLazyGetRatingListQuery();
  const {
    data: ratingList,
    isLoading: isRatingListLoading,
    error: ratingListError,
  } = ratingListData;

  useEffect(() => {
    getRatingList();
  }, [category]);

  useEffect(() => {
    if (!isRatingListLoading && ratingListData.status == "fulfilled") {
      if (category.value == "movies") {
        setMovies(ratingList.results);
        dispatch(setRatingMovies(ratingList.results));
        setNoMovies(ratingList.results.length === 0);
      } else {
        setShows(ratingList.results);
        dispatch(setRatingTv(ratingList.results));
        setNoShows(ratingList.results.length === 0);
      }
    }
  }, [isRatingListLoading, ratingListData]);

  const getRatingList = () => {
    ratingListTrigger({ guestSessionId, category: category.value });
  };

  const categoryChange = (category) => {
    setCategory(category);
  };

  return (
    <Container>
      <h3 className="text-white text-3xl mb-8 mt-10">Rated</h3>
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
      {!isRatingListLoading && (
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
      {isRatingListLoading && <MovieGridSkeleton count={5} />}

      {category.value == "movies" && noMovies && (
        <h3 className="text-xl text-white">You have not rated any movies</h3>
      )}
      {category.value == "tv" && noShows && (
        <h3 className="text-xl text-white">You have no rated any tv series</h3>
      )}
      {ratingListError && <ErrorMessage error={ratingListError} />}
    </Container>
  );
}
