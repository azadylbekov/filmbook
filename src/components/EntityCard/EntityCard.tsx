import { Link } from "react-router-dom";
import moviePlaceholder from "@/assets/images/moviePlaceholder.png";
import { IMovie, IShow } from "@/types";
import { FC } from "react";

type EntityCardProps = {
  entity: IMovie | IShow,
  type: string
};

const EntityCard: FC<EntityCardProps> = ({ entity, type }) => {
  const formatDate = (date: string) => {
    return new Date(date).getFullYear();
  };

  let poster = moviePlaceholder;
  if (entity.poster_path) {
    poster = `http://image.tmdb.org/t/p/w400/${entity.poster_path}`
  }

  let date = '';
  if (type == 'movie') {
    date = formatDate(entity.release_date);
  }
  if (type == 'show') {
    date = formatDate(entity.first_air_date);
  }

  return (
    <div className="border duration-300 dark:!border-[#3c3c3c] rounded-xl text-[#010101] dark:text-[#fefefe] overflow-hidden">
      <Link to={`/${type}/${entity.id}`}>
        <div className="md:h-[400px] h-[250px] overflow-hidden">
          <img
            className="hover:scale-110 duration-300 object-cover w-full h-full"
            src={poster}
            alt=""
          />
        </div>
        <div className="p-3">
          <h3 className="truncate">{entity?.title || entity?.name}</h3>
          <div className="bg-green py px-2 inline-block rounded-lg mt-2">
            {Number(entity.vote_average).toFixed(1)}
          </div>
          {date && (
            <h4 className="dark:text-gray-300 text-[#010101] text-sm inline-block ml-2">
              {date}
            </h4>
          )}
        </div>
      </Link>
    </div>
  );
}

export default EntityCard;