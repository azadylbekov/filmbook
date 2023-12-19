import { formatDate } from "@/utils/functions";
import {
  formatRuntime,
  formatBudget,
  formatOverview,
  formatVote,
} from "@/utils/functions";
import { IMovie, IShow } from "@/types";
import FavoriteBtn from "../Standalone/FavoriteBtn";
import WatchlistBtn from "../Standalone/WatchlistBtn";
import TrailerBtn from "../Standalone/TrailerBtn";
import HomepageLink from "../Standalone/HomepageLink";
import { FC } from "react";

interface InfoProps {
  detail: IMovie | IShow;
  type: "movie" | "tv";
  setShowTrailer: (showTrailer: boolean) => void;
  trailer: any;
  children: React.ReactNode;
  entityId: string | number;
}

const Info: FC<InfoProps> = ({
  detail,
  type,
  setShowTrailer,
  trailer,
  entityId,
  children,
}) => {
  let title,
    tagline,
    voteAverage,
    releaseDate,
    originCountry,
    detailGenres,
    status,
    runtime,
    budget,
    overview,
    homepage,
    episodeRuntime,
    numberOfSeasons,
    numberOfEpisodes;

  tagline = detail.tagline;
  voteAverage = detail.vote_average;
  detailGenres = detail.genres;
  status = detail.status;
  overview = detail.overview;
  homepage = detail.homepage;


  function isMovie(detail: IMovie | IShow): detail is IMovie {
    return 'title' in detail;
  }
  
  if (type === 'movie') {
    if (isMovie(detail)) {
      title = detail.title;
      releaseDate = detail.release_date;
      originCountry = detail.production_companies[0]?.origin_country;
      runtime = detail.runtime;
      budget = detail.budget;
    }
  }
  
  if (type === 'tv') {
    if (!isMovie(detail)) {
      title = detail.name;
      releaseDate = detail.first_air_date;
      originCountry = detail.origin_country[0];
      episodeRuntime = detail.episode_run_time[0];
      numberOfSeasons = detail.number_of_seasons;
      numberOfEpisodes = detail.number_of_episodes;
    }
  }

  return (
    <div className="container mx-auto flex items-center w-full h-full lg:left-1/2 lg:translate-x-[-50%] lg:absolute lg:top-0 mt-2 lg:mt-0">
      <div className="text-[#000000] dark:text-[#ffffff] lg:text-[#ffffff] lg:dark:text-[#ffffff] w-full">
        <h2 className="lg:text-5xl text-2xl mb-2">{title}</h2>
        <div className=" mb-3 lg:w-1/2 w-full">
          <p className="lg:text-2xl text-lg">{tagline}</p>
        </div>
        <div className="flex gap-x-4 items-center mb-3 lg:flex-nowrap flex-wrap">
          <div className="h-5 bg-blue-600 flex items-center justify-center md:text-xl text-lg p-3 w-10 rounded">
            <span>{formatVote(voteAverage)}</span>
          </div>
          <h4 className="md:text-xl text-lg">{formatDate(releaseDate)}</h4>
          <h4 className="text-xl">{originCountry}</h4>
          <div className="flex-column w-full flex gap-x-2 mt-2 lg:w-auto lg:!mt-0 md:!flex-row">
            {detailGenres.map((genre) => (
              <h4 key={genre.id} className="md:text-xl text-lg">
                {genre.name}
              </h4>
            ))}
          </div>
        </div>
        <div className="flex gap-x-4 items-center lg:mb-3 lg:flex-nowrap flex-wrap">
          <div className="mb-2 lg:mb-0 flex gap-x-2 items-center">
            <h4 className="h-5 bg-blue-600 flex items-center justify-center md:text-xl text-lg p-3 rounded lg:mb-0 lg:mb-2">
              {status}
            </h4>
            {episodeRuntime && (
              <h4 className="text-xl">
                {episodeRuntime && formatRuntime(episodeRuntime)}
              </h4>
            )}
          </div>
          {!!runtime && <h4 className="text-xl">{formatRuntime(runtime)}</h4>}
          {!!budget && <h4 className="text-xl">{formatBudget(budget)} USD</h4>}
        </div>
        {type == "tv" && (
          <div className="flex gap-x-4 items-center mb-3">
            <h4 className="text-xl">Number of seasons: {numberOfSeasons}</h4>
            <h4 className="text-xl">Number of episodes: {numberOfEpisodes}</h4>
          </div>
        )}
        <p className="md:text-xl text-lg mt-3">{formatOverview(overview)}</p>

        <div className="flex items-start mt-3 flex-wrap">
          <HomepageLink homepage={homepage} />
          <TrailerBtn trailer={trailer} setShowTrailer={setShowTrailer} />
          {!homepage &&
            (!homepage && !trailer ? "" : <div className="w-2"></div>)}
          <div className="flex md:!justify-start gap-x-4 justify-between mt-2 w-full md:w-[49%] md:!mt-0">
            <FavoriteBtn
              homepage={homepage}
              trailer={trailer}
              entityId={entityId}
              type={type}
            />
            <WatchlistBtn type={type} entityId={entityId} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
