import Skeleton from "react-loading-skeleton";

export default function SliderItemSkeleton() {
  return (
    <div className="w-full">
      <Skeleton
        className={
          "!rounded-none xl:h-[615px] lg:h-[505px] md:h-[439px] h-[329px] w-[1280px]"
        }
        containerClassName="w-full "
      />
    </div>
  );
}
