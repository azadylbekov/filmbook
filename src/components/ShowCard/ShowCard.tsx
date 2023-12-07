import { Link } from "react-router-dom";
import moviePlaceholder from "@/assets/movie_placeholder.png";

export default function ShowCard({show}) {
  const formatDate = (date: string) => {
    return new Date(date).getFullYear();
  };

  let showPoster = moviePlaceholder;
  if (show.poster_path) {
    showPoster = `http://image.tmdb.org/t/p/w400/${show.poster_path}`;
  }

  return (
    <div className="border duration-300 !border-[#3c3c3c] rounded-xl text-white overflow-hidden">
      <Link to={`/show/${show.id}`}>
        <div className="md:h-[400px] h-[250px] overflow-hidden">
          <img
            className="hover:scale-110 duration-300 object-cover w-full h-full"
            src={showPoster}
            alt=""
          />
        </div>
        <div className="p-3">
          <h3 className="truncate">{show.name}</h3>
          <div className="bg-green py px-2 inline-block rounded-lg mt-2">
            {Number(show.vote_average).toFixed(1)}
          </div>
          {show.first_air_date && (
            <h4 className="text-gray-300 text-sm inline-block ml-2">
              {formatDate(show.first_air_date)}
            </h4>
          )}
        </div>
      </Link>
    </div>
  );
}
