import { useEffect, useState, useCallback, useRef } from "react";
import Layout from "@/components/Layout/Layout";
import Container from "@/components/Container";
import { useSelector, useDispatch } from "react-redux";
import { fetchTvGenres } from "@/store/reducers/genreSlice";
import { fetchCountries } from "@/store/reducers/countriesSlice";
import {
  formatGenresOptions,
  handleNumberOnlyInput,
  generateYears,
  formatOptionLabel,
} from "@/utils/functions";
import { customStyles } from "@/utils/selectStyles";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { sortByOptions } from "@/utils/const";
import ShowCard from "@/components/ShowCard/ShowCard";
import { useLazyGetShowsWithFilterQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDidMountEffect } from "@/hooks/useDidMountEffect";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";

export default function TvSeries() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre.tv);
  const countries = useSelector((state) => state.countries.value);
  const [allTvGenres, setAllTvGenres] = useState();
  const [yearOptions, setYearOptions] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState(sortByOptions[1]);
  const [country, setCountry] = useState("");

  const [shows, setShows] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const pageRef = useRef(1);
  const queryRef = useRef("");

  const [noResults, setNoResults] = useState(false);

  const [getShowsTrigger, showsData] = useLazyGetShowsWithFilterQuery();
  const {
    data: showResults,
    isFetching: areShowsLoading,
    error: showsError,
  } = showsData;

  useEffect(() => {
    setYearOptions(generateYears());
  }, []);

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchTvGenres());
    }
    const formattedGenres = formatGenresOptions(genres);
    setAllTvGenres(formattedGenres);
  }, [genres]);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }

    const formattedCountries = formatCountryOptions(countries);
    setAllCountries(formattedCountries);
  }, [countries]);

  const formatCountryOptions = (countries) => {
    return countries.map((country) => {
      return {
        label: country.english_name,
        value: country.iso_3166_1,
      };
    });
  };

  useEffect(() => {
    const queryGenerated = generateQuery();
    queryRef.current = queryGenerated;
    setShows([]);
    fetchShowsQuery();
  }, [genre, year, sortBy, country]);

  const fetchShowsQuery = () => {
    console.log("page", pageRef.current);
    console.log("query", queryRef.current);
    getShowsTrigger({ page: pageRef.current, query: queryRef.current });
  };

  useEffect(() => {
    if (showsData.status == "fulfilled") {
      pageRef.current = pageRef.current + 1;
      let isCurrentSameAsTotalPage = pageRef.current <= showResults.total_pages;
      setHasMore(isCurrentSameAsTotalPage);

      setShows((prevResult) => [...prevResult, ...showResults.results]);
    }
  }, [showsData]);

  const generateQuery = () => {
    let query = "";

    if (year) {
      query += `&first_air_date_year=${year.value}`;
    }
    if (sortBy) {
      query += `&sort_by=${sortBy.value}`;
    }
    if (genre) {
      query += `&with_genres=${genre.value}`;
    }
    if (country) {
      query += `&with_origin_country=${country.value}`;
    }

    pageRef.current = 1;

    return query;
  };

  const genreChange = useCallback((genre) => {
    setGenre(genre);
  }, []);

  const yearChange = useCallback((year) => {
    setYear(year);
  }, []);

  const sortByChange = useCallback((sortBy) => {
    setSortBy(sortBy);
  }, []);

  const countryChange = useCallback((country) => {
    setCountry(country);
  }, []);

  const areShowsEmpty = shows.length === 0;

  useDidMountEffect(() => {
    const results = !areShowsLoading && areShowsEmpty && !showsError;
    setNoResults(results);
  }, [areShowsLoading, areShowsEmpty, showsError]);

  return (
    <div className="text-white py-10">
      <Container>
        <h2 className="text-3xl mb-8">TV Series</h2>
        <div className="flex gap-x-2 lg:flex-nowrap flex-wrap">
          <div className="md:w-auto w-full mb-2">
            <Select
              isClearable
              isSearchable={false}
              options={allTvGenres}
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
          <div className="md:w-auto w-full mb-2">
            <Select
              isClearable
              isSearchable={true}
              options={allCountries}
              styles={customStyles}
              value={country}
              placeholder="Country"
              onChange={countryChange}
            />
          </div>
        </div>
        {shows.length == 0 && <MovieGridSkeleton />}
        <InfiniteScroll
          dataLength={shows.length}
          next={fetchShowsQuery}
          hasMore={hasMore}
          loader={<MovieGridSkeleton />}
        >
          <div className="lg:mt-5 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
            {shows.map((show) => {
              return (
                <div className="mb-4" key={show.id}>
                  <ShowCard show={show} />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
        {noResults && <h3 className="my-2 text-xl">No results</h3>}
        {showsError && <ErrorMessage error={showsError} />}
      </Container>
    </div>
  );
}
