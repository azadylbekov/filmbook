import Container from "@/components/Container";
import { Link } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";
import MovieGridUI from "./MovieGridUI";
import { useGetMoviesByGenreQuery } from "@/services/FilmBookService";
import { IGenre } from "@/types/types";

type MovieGridProps = {
  genre: IGenre
};

export default function MovieGrid({ genre }: MovieGridProps) {

  const {
    data: moviesData,
    isLoading: areMoviesLoading,
    error: moviesError,
  } = useGetMoviesByGenreQuery(genre.id);

  const movies = moviesData?.results || [];

  return (
    <div className="lg:my-6 my-4">
      <Container>
        <Link
          to="/movies"
          state={{ genre: genre.name, genreId: genre.id }}
          className="lg:text-2xl text-xl text-white lg:my-5 mb-4 flex items-center group"
        >
          <span className="group-hover:mr-4 mr-2 duration-300">
            {genre.name}
          </span>
          <FaAngleRight />
        </Link>
        <MovieGridUI isNav={true} movies={movies} isLoading={areMoviesLoading} />
      </Container>
    </div>
  );
}
