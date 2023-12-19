import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useGetPersonQuery,
  useLazyGetMoviesWithPersonQuery,
} from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import MovieGridSkeleton from "@/components/MovieGrid/MovieGridSkeleton";
import { IMovie } from "@/types";
import About from "@/components/Person/About";
import InfoSkeleton from "@/components/Person/InfoSkeleton";
import EntityCard from "@/components/EntityCard/EntityCard";

const Person = () => {
  const page = useParams();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const personData = useGetPersonQuery(page.personId);
  const {
    data: person,
    isLoading: isPersonLoading,
    error: personError,
  } = personData;

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
      setMovies((prevMovies) => [...prevMovies, ...movieResults!.results]);

      if (movieResults!.total_pages == movieResults!.page) {
        setHasMore(false);
      } else {
        setPageNumber((prevPage) => prevPage + 1);
      }
    }
  }, [moviesData]);

  const fetchMoviesWithPerson = () => {
    getMoviesTrigger({ page: pageNumber, id: page.personId });
  };

  const noResult = movies.length === 0 && !areMoviesLoading && !moviesError;

  return (
    <div className="dark:text-[#ffffff] text-[#000000] py-10">
      <Container>
        <div>
          {!isPersonLoading && person && (
            <About person={person} />
          )}
          {isPersonLoading && <InfoSkeleton />}
        </div>
        {personError && <ErrorMessage error={personError} />}
        {person && movies.length > 0 && (
          <h3 className="text-2xl mt-5">
            Movies with {person.name} (
            {movieResults!.total_results && movieResults!.total_results})
          </h3>
        )}
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoviesWithPerson}
          hasMore={hasMore}
          loader={!moviesError && !personError && <MovieGridSkeleton />}
        >
          <div className="mt-5 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2">
            {movies.map((movie: IMovie) => (
              <div className="mb-4" key={movie.id}>
                <EntityCard type="movie" entity={movie} />
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

export default Person;