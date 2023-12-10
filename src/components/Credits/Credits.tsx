import Container from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetCreditsQuery } from "@/services/FilmBookService";
import CreditsLoader from "./CreditsLoader";
import CreditItem from "./CreditItem";

interface CreditsProps {
  id: number,
  type: string,
}

export default function Credits({ id, type }: CreditsProps) {
  const creditsData = useGetCreditsQuery({ id, type });
  const {
    data: credits,
    isLoading: isCreditsLoading,
    error: creditsError,
  } = creditsData;

  let castAndCrew = [];
  if (!isCreditsLoading && credits) {
    const cast = credits.cast.slice(0, 6);
    const crew = credits.crew.slice(0, 6);
    castAndCrew = [...cast, ...crew];
  }

  const swiperBreakpoints = {
    1: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    540: {
      slidesPerView: 3,
    },
    840: {
      slidesPerView: 4,
    },
    1000: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1400: {
      slidesPerView: 7,
    },
  };

  return (
    <div className="my-10">
      <Container>
        {!isCreditsLoading && castAndCrew.length && (
          <div>
            <h3 className="text-white lg:text-2xl text-xl mb-2">Cast and crew</h3>
            <Swiper
              className="!pt-10"
              breakpoints={swiperBreakpoints}
              style={{ height: "100%" }}
            >
              {castAndCrew.map((person) => {
                return (
                  <SwiperSlide key={person.credit_id}>
                    <CreditItem person={person} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
        {isCreditsLoading && <CreditsLoader />}
      </Container>
    </div>
  );
}
