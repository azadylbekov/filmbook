import Container from "@/components/Container";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { customStyles } from "@/utils/selectStyles";
import {
  formatGenresOptions,
  handleNumberOnlyInput,
  generateYears,
  formatOptionLabel,
} from "@/utils/functions";
import { sortByOptions } from "@/constants/const";
import { useLazyGetMoviesWithFilterQuery, useLazyGetGenresQuery } from "@/services/FilmBookService";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import { ICategory, IGenre, IMovie } from "@/types";
import { useAppSelector } from "@/store/hooks";
import EntityCard from "@/components/EntityCard/EntityCard";


const Movies = () => {
  const genres = useAppSelector((state) => state.genre.movie);

  const [genre, setGenre] = useState<ICategory | null>(null);
  const [year, setYear] = useState<ICategory | null>(null);
  const [sortBy, setSortBy] = useState<ICategory>(sortByOptions[1]);
  const [allMovieGenres, setAllMovieGenres] = useState<Array<IGenre>>([]);
  const [yearOptions, setYearOptions] = useState<Array<ICategory>>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const [movies, setMovies] = useState<IMovie[]>([]);

  const [getMoviesTrigger, moviesData] = useLazyGetMoviesWithFilterQuery();
  const {
    data: movieResults,
    isFetching: areMoviesLoading,
    error: moviesError,
  } = moviesData;

  const [getGenresTrigger, genresData] = useLazyGetGenresQuery();

  const { state } = useLocation();

  const pageRef = useRef(1);
  const queryRef = useRef("");
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (genres.length === 0) {
      getGenresTrigger("movies");
    }
    const formattedGenres = formatGenresOptions(genres);
    setAllMovieGenres(formattedGenres);
  }, [genres]);

  useEffect(() => {
    setYearOptions(generateYears());

    if (state) {
      const selectedOption = { label: state.genre, value: state.genreId };
      setGenre(selectedOption);
    }
  }, [state]);

  useEffect(() => {
    const queryGenerated = generateQuery();
    queryRef.current = queryGenerated;
    setMovies([]);
    fetchMovieQuery();
  }, [genre, year, sortBy]);

  useEffect(() => {
    if (moviesData.status == "fulfilled") {
      pageRef.current = pageRef.current + 1;
      let isCurrentSameAsTotalPage =
        pageRef.current <= movieResults!.total_pages;
      setHasMore(isCurrentSameAsTotalPage);

      setMovies((prevResult) => [...prevResult, ...movieResults!.results]);
    }
  }, [moviesData]);

  const fetchMovieQuery = () => {
    getMoviesTrigger({ page: pageRef.current, query: queryRef.current });
  };

  const generateQuery = () => {
    let query = "";

    if (year) {
      query += `&primary_release_year=${year.value}`;
    }
    if (sortBy) {
      query += `&sort_by=${sortBy.value}`;
    }
    if (genre) {
      query += `&with_genres=${genre.value}`;
    }

    pageRef.current = 1;

    return query;
  };

  const genreChange = useCallback((genre: ICategory) => {
    setGenre(genre);
  }, []);

  const yearChange = useCallback((year: ICategory) => {
    setYear(year);
  }, []);

  const sortByChange = useCallback((sortBy: ICategory) => {
    setSortBy(sortBy);
  }, []);

  const areMoviesEmpty = movies.length === 0;

  useDidMountEffect(() => {
    const results = !areMoviesLoading && areMoviesEmpty && !moviesError;
    setNoResults(results);
  }, [areMoviesLoading, areMoviesEmpty, moviesError]);

  return (
    <main className="dark:text-[#ffffff] text-[#000000] lg:py-10 py-8">
      <Container>
        <h2 className="lg:text-3xl text-2xl lg:mb-8 mb-4">Movies</h2>
        <div className="flex gap-x-2 lg:flex-nowrap flex-wrap">
          <div className="md:w-auto w-full mb-2">
            <Select
              isClearable
              isSearchable={false}
              options={allMovieGenres}
              styles={customStyles}
              value={genre}
              onChange={genreChange}
              placeholder="Genres"
            />
          </div>
          <div className="md:w-auto w-full mb-2">
            <CreatableSelect
              isSearchable
              isClearable
              options={yearOptions}
              styles={customStyles}
              value={year}
              placeholder="Year of release"
              onChange={yearChange}
              onKeyDown={handleNumberOnlyInput}
            />
          </div>
          <div className="md:w-auto w-full mb-2">
            <Select
              isSearchable={false}
              options={sortByOptions}
              styles={customStyles}
              value={sortBy}
              placeholder="Sort by"
              formatOptionLabel={formatOptionLabel}
              onChange={sortByChange}
              defaultValue={sortByOptions[1]}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMovieQuery}
          hasMore={hasMore}
          loader={<MovieGridSkeleton />}
        >
          <div className="lg:mt-5 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
            {movies.map((movie) => {
              return (
                <div className="mb-4" key={movie.id}>
                  <EntityCard type="movie" entity={movie} />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {noResults && <h3 className="my-2 text-xl">No results</h3>}
        {moviesError && <ErrorMessage error={moviesError} />}
      </Container>
    </main>
  );
}

export default Movies;