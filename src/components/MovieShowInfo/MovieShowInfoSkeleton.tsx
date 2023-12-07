import Skeleton from "react-loading-skeleton";

export default function MovieShowInfoSkeleton() {
  return (
    <div className="relative movie-detail-poster">
      <div className="block pb-0 lg:!pb-[45%] "></div>
      <div className="lg:absolute top-0 left-0 right-0 bottom-0 z-[-1] bg-no-repeat bg-cover static">
        <Skeleton
          className={"!rounded-md !w-full lg:pb-[45%] pb-[60%]"}
          containerClassName=""
          count={1}
        />
      </div>
      <div className="container mx-auto flex items-center w-full h-full lg:left-1/2 lg:translate-x-[-50%] lg:absolute lg:top-0 mt-2 lg:mt-0">
        <div className="w-full lg:block hidden">
          <Skeleton
            className={"!rounded-md !w-1/3 mb-3"}
            containerClassName=""
            count={5}
            height={35}
          />
        </div>
        <div className="w-full lg:hidden block my-3">
          <Skeleton
            className={"!rounded-md !w-full mb-2"}
            containerClassName=""
            count={5}
            height={25}
          />
        </div>
      </div>
    </div>
  );
}
