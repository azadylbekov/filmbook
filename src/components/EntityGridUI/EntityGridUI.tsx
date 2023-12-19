import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import EntityCard from "@/components/EntityCard/EntityCard";
import "swiper/css";
import "swiper/css/navigation";
import MovieCardSkeleton from "../MovieGrid/MovieCardSkeleton";
import { IMovie, IShow } from "@/types/types";
import { FC } from "react";

const SWIPER_BREAKPOINTS = {
  1: {
    slidesPerView: 1,
    spaceBetween: 5,
  },
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  960: {
    slidesPerView: 3,
  },
  1200: {
    slidesPerView: 4,
  },
  1400: {
    slidesPerView: 5,
  },
};

interface EntityGridUIProps {
  isNav: boolean;
  entitities: IMovie[] | IShow[];
  isLoading: boolean;
  type: string
}

const EntityGridUI: FC<EntityGridUIProps> = ({
  isNav,
  entitities,
  isLoading,
  type
}) => {
  const skeletons = [0, 1, 2, 3, 4];

  return (
    <div className="md:min-h-[485px] min-h-[250px]">
      <Swiper
        modules={isNav ? [Navigation] : []}
        slidesPerView={5}
        spaceBetween={20}
        breakpoints={SWIPER_BREAKPOINTS}
        navigation={isNav}
        style={{ height: "100%" }}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <SwiperSlide key={skeleton}>
              <MovieCardSkeleton />
            </SwiperSlide>
          ))}

        {!isLoading &&
          entitities.map((entity) => (
            <SwiperSlide key={entity.id}>
              <EntityCard type={type} entity={entity} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default EntityGridUI;