import { useEffect, useState } from "react";
import Container from "@/components/Container";
import { useParams } from "react-router-dom";
import Credits from "@/components/Entity/Credits/Credits";
import {
  useGetShowByIdQuery,
  useGetSimilarShowsQuery,
  useGetVideosQuery,
} from "@/services/FilmBookService";
import RatingDropdown from "@/components/Entity/Standalone/RatingDropdown";
import TrailerModal from "@/components/TrailerModal/TrailerModal";
import {  ITrailer } from "@/types";
import Background from "@/components/Entity/Standalone/Background";
import Info from "@/components/Entity/Info/Info";
import Overview from "@/components/Entity/Standalone/Overview";
import InfoSkeleton from "@/components/Entity/Info/InfoSkeleton";
import EntityGridUI from "@/components/EntityGridUI/EntityGridUI";

const Show = () => {
  const { showId } = useParams();

  const [trailer, setTrailer] = useState<ITrailer | null>(null);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const showData = useGetShowByIdQuery(showId!);
  const { data: show, isLoading: isShowLoading } = showData;

  const similarShowsData = useGetSimilarShowsQuery(showId);
  const similarShows = similarShowsData?.data?.results;
  const { isLoading: isSimilarShowsLoading } =
    similarShowsData;

  const {
    data: videos,
    isLoading: areVideosLoading,
  } = useGetVideosQuery({ type: "tv", id: showId });

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
      {!isShowLoading && show && (
        <div>
          <div className="relative movie-detail-poster after:content-none dark:content-['']">
            <div className="block pb-0 lg:!pb-[45%] "></div>
            <Background backdrop={show.backdrop_path} />
            <Info
              detail={show}
              type="tv"
              setShowTrailer={setShowTrailer}
              trailer={trailer}
              entityId={show.id}
            >
              <RatingDropdown entityId={showId} type="tv" />
            </Info>
          </div>
          <TrailerModal
            showTrailer={showTrailer}
            setShowTrailer={setShowTrailer}
            title={show.name}
            trailer={trailer}
          />
          <Container>
            {!isShowLoading && show && (
              <Overview overview={show.overview} />
            )}
          </Container>
        </div>
      )}
      {isShowLoading && <InfoSkeleton />}
      <Credits id={showId} type="tv" />
      {!isSimilarShowsLoading && similarShows && similarShows.length > 0 && (
        <div className="my-6">
          <Container>
            <h3 className="lg:text-2xl text-xl text-white lg:my-5 my-3 flex items-center">
              Similar shows
            </h3>
            <EntityGridUI
              type="show"
              isNav={true}
              entitities={similarShows}
              isLoading={isSimilarShowsLoading}
            />
          </Container>
        </div>
      )}
    </>
  );
}

export default Show;