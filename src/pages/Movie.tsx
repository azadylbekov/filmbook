import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Credits from "@/components/Entity/Credits/Credits";
import Container from "@/components/Container";
import TrailerModal from "@/components/TrailerModal/TrailerModal";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetMovieByIdQuery,
  useGetSimilarMoviesQuery,
  useGetVideosQuery,
} from "@/services/FilmBookService";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { ITrailer } from "@/types";
import Background from "@/components/Entity/Standalone/Background";
import Info from "@/components/Entity/Info/Info";
import RatingDropdown from "@/components/Entity/Standalone/RatingDropdown";
import Overview from "@/components/Entity/Standalone/Overview";
import InfoSkeleton from "@/components/Entity/Info/InfoSkeleton";
import EntityGridUI from "@/components/EntityGridUI/EntityGridUI";

const Movie = () => {
  const { movieId } = useParams<string>();

  const [trailer, setTrailer] = useState<ITrailer | null>(null);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const movieData = useGetMovieByIdQuery(movieId);
  const {
    data: movie,
    isFetching: isMovieLoading,
    error: movieError,
  } = movieData;

  const similarMoviesData = useGetSimilarMoviesQuery(movieId);
  const similarMovies = similarMoviesData?.data?.results;
  const { isLoading: isSimilarMoviesLoading, error: similarMoviesError } =
    similarMoviesData;

  const {
    data: videos,
    isLoading: areVideosLoading,
    error: videosError,
  } = useGetVideosQuery({ type: "movie", id: movieId });

  useEffect(() => {
    if (!areVideosLoading && videos) {
      let trailer = videos.results.filter(
        (item: ITrailer) => item.type == "Trailer"
      )[0];
      setTrailer(trailer);
    }
  }, [areVideosLoading, videos]);

  return (
    <>
      {!isMovieLoading && movie && (
        <div>
          <div className="relative movie-detail-poster after:content-none dark:content-['']">
            <div className="block pb-0 lg:!pb-[45%] "></div>
            <Background backdrop={movie.backdrop_path} />
            <Info
              detail={movie}
              type="movie"
              setShowTrailer={setShowTrailer}
              trailer={trailer}
              entityId={movieId}
            >
              <RatingDropdown entityId={movieId} type="movie" />
            </Info>
          </div>
          <TrailerModal
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
            title={movie.title}
            trailer={trailer}
          />
          <Container>
            {!isMovieLoading && movie && (
              <Overview overview={movie.overview} />
            )}
          </Container>
        </div>
      )}
      {isMovieLoading && <InfoSkeleton />}

      <Container>
        {movieError && (
          <div className="mt-2">
            <ErrorMessage error={movieError} />
          </div>
        )}
      </Container>
      <Credits id={movieId} type="movie" />
      {!isSimilarMoviesLoading && similarMovies.length > 0 && (
        <div className="my-6">
          <Container>
            <h3 className="lg:text-2xl text-xl text-white lg:my-5 my-3 flex items-center">
              Similar movies
            </h3>
            <EntityGridUI
              type="movie"
              isNav={true}
              entitities={similarMovies}
              isLoading={isSimilarMoviesLoading}
            />
          </Container>
        </div>
      )}
    </>
  );
}

export default Movie;