import Skeleton from "react-loading-skeleton";

const SearchResultSkeleton = () => {
  const skeletons = [0, 1, 2];

  return (
    <>
      {skeletons.map((skeleton) => (
        <div key={skeleton} className="flex items-center mb-2 p-1">
          <div className="h-20 mr-2 shrink-0">
            <Skeleton
              className={"!rounded-none"}
              containerClassName=""
              width={53}
              height={79}
            />
          </div>
          <div className="w-full">
            <Skeleton
              className={"!rounded-none"}
              containerClassName="flex-1"
              height={20}
              count={2}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default SearchResultSkeleton;
