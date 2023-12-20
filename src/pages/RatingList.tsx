import Container from "@/components/Container";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "@/utils/selectStyles";
import { setRatingMovies, setRatingTv } from "@/store/reducers/ratingSlice";
import { useLazyGetRatingListQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { ICategory, IMovie, IShow } from "@/types";
import { CATEGORY_OPTIONS } from "@/constants/constants";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import EntityCard from "@/components/EntityCard/EntityCard";

const RatingList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [shows, setShows] = useState<IShow[]>([]);
  const [category, setCategory] = useState<ICategory>(CATEGORY_OPTIONS[0]);
  const dispatch = useAppDispatch();
  const guestSessionId = useAppSelector((state) => state.guestId.value);

  const [noMovies, setNoMovies] = useState<boolean>(false);
  const [noShows, setNoShows] = useState<boolean>(false);

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
      if (category.value == "movies" && ratingList) {
        setMovies(ratingList.results);
        dispatch(setRatingMovies(ratingList.results));
        setNoMovies(ratingList.results.length === 0);
      }
      if (category.value == "tv" && ratingList) {
        setShows(ratingList.results);
        dispatch(setRatingTv(ratingList.results));
        setNoShows(ratingList.results.length === 0);
      }
    }
  }, [isRatingListLoading, ratingListData]);

  const getRatingList = () => {
    ratingListTrigger({ guestSessionId, category: category.value });
  };

  const categoryChange = (category: any) => {
    setCategory(category);
  };

  return (
    <Container>
      <h3 className="dark:text-[#ffffff] text-[#000000] text-3xl mb-8 mt-10">Rated</h3>
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
      {!isRatingListLoading && (
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
      {isRatingListLoading && <MovieGridSkeleton count={5} />}

      {category.value == "movies" && noMovies && (
        <h3 className="text-xl dark:text-[#ffffff] text-[#000000]">You have not rated any movies</h3>
      )}
      {category.value == "tv" && noShows && (
        <h3 className="text-xl dark:text-[#ffffff] text-[#000000]">You have no rated any tv series</h3>
      )}
      {ratingListError && <ErrorMessage error={ratingListError} />}
    </Container>
  );
}

export default RatingList;