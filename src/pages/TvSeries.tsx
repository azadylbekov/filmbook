import { useEffect, useState, useCallback, useRef } from "react";
import Container from "@/components/Container";
import {
  formatGenresOptions,
  handleNumberOnlyInput,
  generateYears,
  formatOptionLabel,
} from "@/utils/functions";
import { customStyles } from "@/utils/selectStyles";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { sortByOptions } from "@/constants/const";
import { useLazyGetShowsWithFilterQuery, useLazyGetCountriesQuery, useLazyGetGenresQuery } from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { ICategory, IGenre, IShow, ICountry } from "@/types";
import { useAppSelector } from "@/store/hooks";
import EntityCard from "@/components/EntityCard/EntityCard";

const TvSeries = () => {
  const genres = useAppSelector((state) => state.genre.tv);
  const countries = useAppSelector((state) => state.countries.value);
  const [allTvGenres, setAllTvGenres] = useState<IGenre[]>([]);
  const [yearOptions, setYearOptions] = useState<ICategory[]>([]);
  const [allCountries, setAllCountries] = useState<ICountry[] | ICategory[]>(
    []
  );

  const [genre, setGenre] = useState<ICategory | null>(null);
  const [year, setYear] = useState<ICategory | null>(null);
  const [sortBy, setSortBy] = useState<ICategory | null>(sortByOptions[1]);
  const [country, setCountry] = useState<ICategory | null>(null);

  const [shows, setShows] = useState<IShow[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageRef = useRef<number>(1);
  const queryRef = useRef<string>("");

  const [noResults, setNoResults] = useState<boolean>(false);

  const [getShowsTrigger, showsData] = useLazyGetShowsWithFilterQuery();
  const {
    data: showResults,
    isFetching: areShowsLoading,
    error: showsError,
  } = showsData;

  const [getCountriesTrigger, countriesData] = useLazyGetCountriesQuery();
  const [getGenresTrigger, genresData] = useLazyGetGenresQuery();
  

  useEffect(() => {
    setYearOptions(generateYears());
  }, []);

  useEffect(() => {
    if (genres.length === 0) {
      getGenresTrigger("tv");

    }
    const formattedGenres = formatGenresOptions(genres);
    setAllTvGenres(formattedGenres);
  }, [genres]);

  useEffect(() => {
    if (countries.length === 0) {
      getCountriesTrigger();
    }

    const formattedCountries = formatCountryOptions(countries);
    setAllCountries(formattedCountries);
  }, [countries]);

  const formatCountryOptions = (countries: ICountry[]) => {
    return countries.map((country: ICountry) => {
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
    getShowsTrigger({ page: pageRef.current, query: queryRef.current });
  };

  useEffect(() => {
    if (showsData.status == "fulfilled") {
      pageRef.current = pageRef.current + 1;
      let isCurrentSameAsTotalPage =
        pageRef.current <= showResults!.total_pages;
      setHasMore(isCurrentSameAsTotalPage);

      setShows((prevResult) => [...prevResult, ...showResults!.results]);
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

  const genreChange = useCallback((genre: ICategory) => {
    setGenre(genre);
  }, []);

  const yearChange = useCallback((year: ICategory) => {
    setYear(year);
  }, []);

  const sortByChange = useCallback((sortBy: ICategory) => {
    setSortBy(sortBy);
  }, []);

  const countryChange = useCallback((country: ICategory) => {
    setCountry(country);
  }, []);

  const areShowsEmpty = shows.length === 0;

  useDidMountEffect(() => {
    const results = !areShowsLoading && areShowsEmpty && !showsError;
    setNoResults(results);
  }, [areShowsLoading, areShowsEmpty, showsError]);

  return (
    <div className="dark:text-[#ffffff] text-[#000000] py-10">
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
            {shows.map((show) => (
              <div className="mb-4" key={show.id}>
                <EntityCard type="show" entity={show} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {noResults && <h3 className="my-2 text-xl">No results</h3>}
        {showsError && <ErrorMessage error={showsError} />}
      </Container>
    </div>
  );
};

export default TvSeries;
