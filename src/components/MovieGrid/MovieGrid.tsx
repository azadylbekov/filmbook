import Container from "@/components/Container";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { useGetMoviesByGenreQuery } from "@/services/FilmBookService";
import { IGenre } from "@/types/types";
import { FC } from "react";
import EntityGridUI from "../EntityGridUI/EntityGridUI";

type MovieGridProps = {
  genre: IGenre
};

const MovieGrid: FC<MovieGridProps> = ({ genre }) => {

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
          className="lg:text-2xl text-xl text-[#010101] dark:text-[#fefefe] lg:my-5 mb-4 flex items-center group"
        >
          <span className="group-hover:mr-4 mr-2 duration-300">
            {genre.name}
          </span>
          <FaAngleRight />
        </Link>
        <EntityGridUI isNav={true} type="movie" entitities={movies} isLoading={areMoviesLoading} />
      </Container>
    </div>
  );
}

export default MovieGrid;