import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import Container from "@/components/Container";
import { useParams } from "react-router-dom";
import MovieCard from "@/components/MovieCard/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import emptyAvatar from "@/assets/empty_avatar.webp";
import {
  useGetPersonQuery,
  useLazyGetMoviesWithPersonQuery,
} from "@/services/FilmBookService";
import PersonInfo from "@/components/PersonInfo/PersonInfo";
import PersonBiography from "@/components/PersonBiography/PersonBiography";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import PersonInfoSkeleton from "@/components/PersonInfo/PersonInfoSkeleton";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { IPerson } from "@/types/types";


export default function Person() {
  const page = useParams();
  const [showMore, setShowMore] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const personData = useGetPersonQuery(page.personId);
  const {
    data: person,
    isLoading: isPersonLoading,
    error: personError,
  } = personData;
  // const person: IPerson = personData;


  const [getMoviesTrigger, moviesData] = useLazyGetMoviesWithPersonQuery();
  const {
    data: movieResults,
    isFetching: areMoviesLoading,
    error: moviesError,
  } = moviesData;

  useEffect(() => {
    getMoviesTrigger({ page: pageNumber, id: page.personId });
  }, [page]);

  useEffect(() => {
    if (!areMoviesLoading && moviesData.status == "fulfilled") {
      setMovies((prevMovies) => [...prevMovies, ...movieResults.results]);

      if (movieResults.total_pages == movieResults.page) {
        setHasMore(false);
      } else {
        setPageNumber((prevPage) => prevPage + 1);
      }
    }
  }, [moviesData]);

  const fetchMoviesWithPerson = () => {
    getMoviesTrigger({ page: pageNumber, id: page.personId });
  };

  let personImg;
  if (person) {
    personImg = person.profile_path
      ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
      : emptyAvatar;
  }

  const noResult = movies.length === 0 && !areMoviesLoading && !moviesError;

  return (
    <div className="text-white py-10">
      <Container>
        <div>
          {!isPersonLoading && person && (
            <div className="flex md:!flex-nowrap flex-wrap">
              <div className="md:w-[300px] shrink-0 mr-10 md:h-[400px] w-[225px] h-[300px] relative overflow-hidden md:mb-0 mb-4">
                <img
                  className="rounded absolute w-full h-full object-cover"
                  src={personImg}
                  alt=""
                />
              </div>
              <div className="sm:max-md:block hidden">
                <PersonInfo person={person} />
              </div>
              <div>
                <div className="sm:max-md:hidden block">
                  <PersonInfo person={person} />
                </div>
                <PersonBiography
                  biography={person?.biography}
                  showMore={showMore}
                  setShowMore={setShowMore}
                />
              </div>
            </div>
          )}
          {isPersonLoading && <PersonInfoSkeleton />}
        </div>
        {personError && <ErrorMessage error={personError} />}
        {person && movies.length > 0 && (
          <h3 className="text-2xl mt-5">
            Movies with {person.name} (
            {movieResults.total_results && movieResults.total_results})
          </h3>
        )}
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoviesWithPerson}
          hasMore={hasMore}
          loader={!moviesError && !personError && <MovieGridSkeleton />}
        >
          <div className="mt-5 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
            {movies.map((movie, index) => (
              <div className="mb-4" key={movie.id + index}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {noResult && <h3 className="mt-2 text-xl">No Results found</h3>}
        {moviesError && <ErrorMessage error={moviesError} />}
      </Container>
    </div>
  );
}
