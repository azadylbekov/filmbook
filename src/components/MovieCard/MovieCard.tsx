import { Link } from "react-router-dom";
import moviePlaceholder from "@/assets/movie_placeholder.png";
import { IMovie } from "@/types/types";

type MovieCardProps = {
  movie: IMovie
};

export default function MovieCard({ movie }: MovieCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).getFullYear();
  };

  let moviePoster = moviePlaceholder;
  if (movie.poster_path) {
    moviePoster = `http://image.tmdb.org/t/p/w400/${movie.poster_path}`
  }

  return (
    <div className="border duration-300 !border-[#3c3c3c] rounded-xl text-white overflow-hidden">
      <Link to={`/movie/${movie.id}`}>
        <div className="md:h-[400px] h-[250px] overflow-hidden">
          <img
            className="hover:scale-110 duration-300 object-cover w-full h-full"
            src={moviePoster}
            alt=""
          />
        </div>
        <div className="p-3">
          <h3 className="truncate">{movie.title}</h3>
          <div className="bg-green py px-2 inline-block rounded-lg mt-2">
            {Number(movie.vote_average).toFixed(1)}
          </div>
          {movie.release_date && (
            <h4 className="text-gray-300 text-sm inline-block ml-2">
              {formatDate(movie.release_date)}
            </h4>
          )}
        </div>
      </Link>
    </div>
  );
}
