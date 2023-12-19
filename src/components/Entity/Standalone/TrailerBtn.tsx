import { ITrailer } from "@/types/types";
import { FC } from "react";

interface TrailerBtnProps {
  trailer?: ITrailer | undefined,
  setShowTrailer: (show: boolean) => void
}

const TrailerBtn: FC<TrailerBtnProps> = ({ trailer, setShowTrailer }) => {
  return (
    <>
      {trailer && (
        <button
          onClick={() => setShowTrailer(true)}
          className="rounded-lg hover:bg-white hover:text-black duration-300 px-4 py-3 lg:!py-2 md:py-2 md:w-[49%] lg:mr-4 border lg:w-auto w-full mb-2 lg:mb-0"
        >
          Watch trailer
        </button>
      )}
    </>
  );
};

export default TrailerBtn;
