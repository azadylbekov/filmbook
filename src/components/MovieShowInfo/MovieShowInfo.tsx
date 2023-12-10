import { formatDate } from "@/utils/functions";
import { FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
  formatRuntime,
  formatBudget,
  formatOverview,
  formatVote,
} from "@/utils/functions";
import { IMovie, IShow } from "@/types/types";

interface MovieShowInfoProps {
  detail: IMovie | IShow,
  type: 'movie' | 'show',
  setShowTrailer: () => void,
  trailer: any,
  isFavorite: boolean,
  toggleWatchlist: () => void,
  addToFavorite: () =>  void,
  isWatchlist: boolean,
  children: React.ReactNode
}

export default function MovieShowInfo({
  detail,
  type,
  setShowTrailer,
  trailer,
  isFavorite,
  toggleWatchlist,
  addToFavorite,
  isWatchlist,
  children,
}: MovieShowInfoProps) {
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

  if (type == "movie") {
    title = detail.title;
    releaseDate = detail.release_date;
    originCountry = detail.production_companies[0]?.origin_country;
    runtime = detail.runtime;
    budget = detail.budget;
  }

  if (type == "show") {
    title = detail.name;
    releaseDate = detail.first_air_date;
    originCountry = detail.origin_country[0];
    episodeRuntime = detail.episode_run_time[0];
    numberOfSeasons = detail.number_of_seasons;
    numberOfEpisodes = detail.number_of_episodes;
  }

  return (
    <div className="container mx-auto flex items-center w-full h-full lg:left-1/2 lg:translate-x-[-50%] lg:absolute lg:top-0 mt-2 lg:mt-0">
      <div className="text-white w-full">
        <h2 className="lg:text-5xl text-2xl mb-2">{title}</h2>
        <div className=" mb-3 lg:w-1/2 w-full">
          <p className="lg:text-2xl text-lg">{tagline}</p>
        </div>
        <div className="flex gap-x-4 items-center mb-3 lg:flex-nowrap flex-wrap">
          <div className="h-5 bg-blue-600 flex items-center justify-center md:text-xl text-lg p-3 w-10 rounded">
            <span>{formatVote(voteAverage)}</span>
          </div>
          <h4 className="md:text-xl text-lg text-gray-300">{formatDate(releaseDate)}</h4>
          <h4 className="text-xl text-gray-300">{originCountry}</h4>
          <div className="flex-column w-full flex gap-x-2 mt-2 lg:w-auto lg:!mt-0 md:!flex-row">
            {detailGenres.map((genre) => {
              return (
                <h4 key={genre.id} className="md:text-xl text-lg text-gray-300">
                  {genre.name}
                </h4>
              );
            })}
          </div>
        </div>
        <div className="flex gap-x-4 items-center lg:mb-3 lg:flex-nowrap flex-wrap">
          <div className="mb-2 lg:mb-0 flex gap-x-2 items-center">
            <h4 className="h-5 bg-blue-600 flex items-center justify-center md:text-xl text-lg p-3 rounded lg:mb-0 lg:mb-2">
              {status}
            </h4>
            {episodeRuntime && (
              <h4 className="text-xl text-gray-300">
                {episodeRuntime && formatRuntime(episodeRuntime)}
              </h4>
            )}
          </div>
          {!!runtime  && (
            <h4 className="text-xl text-gray-300">{formatRuntime(runtime)}</h4>
          )}
          {!!budget && (<h4 className="text-xl text-gray-300">{formatBudget(budget)} USD</h4>)}
        </div>
        {type == "show" && (
          <div className="flex gap-x-4 items-center mb-3">
            <h4 className="text-xl text-gray-300">
              Number of seasons: {numberOfSeasons}
            </h4>
            <h4 className="text-xl text-gray-300">
              Number of episodes: {numberOfEpisodes}
            </h4>
          </div>
        )}
        <p className="md:text-xl text-lg mt-3">{formatOverview(overview)}</p>

        <div className="flex items-start mt-3 flex-wrap">
          {homepage && (
            <a
              href={homepage}
              className="flex items-center green-gradient duration-300 rounded-lg px-4 py-3 lg:!py-2 md:py-2 md:w-[49%] lg:mr-4 md:mr-[2%] justify-center lg:justify-start lg:w-auto w-full mb-3 lg:mb-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit web page
            </a>
          )}
          {trailer && (
            <button
              onClick={() => setShowTrailer(true)}
              className="rounded-lg hover:bg-white hover:text-black duration-300 px-4 py-3 lg:!py-2 md:py-2 md:w-[49%] lg:mr-4 border lg:w-auto w-full mb-2 lg:mb-0"
            >
              Watch trailer
            </button>
          )}
          {!homepage && (!homepage && !trailer ? "" : <div className="w-2"></div>)}
          <div className="flex md:!justify-start gap-x-4 justify-between mt-2 w-full md:w-[49%] md:!mt-0">
            <button
              onClick={addToFavorite}
              className={"rounded-lg hover:bg-white text-white-300 hover:text-red-600 duration-300 px-3 py-2 border " + (!homepage && !trailer ? '' :'lg:ml-2')}
            >
              <FaHeart
                className={"text-2xl " + (isFavorite ? "text-red-600" : "")}
              />
            </button>
            <button
              onClick={toggleWatchlist}
              className="rounded-lg hover:bg-white text-white-300 hover:text-yellow-600 duration-300 px-3 py-2 border lg:ml-2"
            >
              {isWatchlist && (
                <FaBookmark className="text-2xl text-yellow-600" />
              )}
              {!isWatchlist && <FaRegBookmark className="text-2xl " />}
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
