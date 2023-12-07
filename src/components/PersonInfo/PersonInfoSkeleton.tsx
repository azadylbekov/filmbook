import Skeleton from "react-loading-skeleton";

export default function PersonInfoSkeleton() {
  return (
    <div className="flex md:!flex-nowrap flex-wrap ">
      <div className="md:w-[300px] shrink-0 mr-10 md:h-[400px] w-[225px] h-[300px] relative overflow-hidden md:mb-0 mb-4">
        <Skeleton
          className={"!rounded-md md:h-[400px] w-[225px] h-[300px]"}
          containerClassName="w-full "
        />
      </div>
      <div className="sm:max-md:block hidden flex-grow h-full h-[300px]">
        <Skeleton
          className={"!rounded-none w-full mb-2"}
          containerClassName=""
          height={20}
          count={4}
        />
      </div>
      <div className="flex-grow sm:max-md:w-auto w-full md:h-[400px] h-[300px] relative overflow-hidden md:mb-0 mb-4">
        <div className="h-full sm:max-md:hidden block">
          <Skeleton
            className={"!rounded-none !w-1/2 mb-2"}
            containerClassName=""
            count={4}
            height={20}
          />
          <div className="mt-4">
            <Skeleton
              className={"!rounded-none md:h-[400px] h-[300px] mb-2"}
              containerClassName=""
              height={20}
              count={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
