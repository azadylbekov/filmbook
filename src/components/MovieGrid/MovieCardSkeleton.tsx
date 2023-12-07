import useWindowDimensions from "@/hooks/useWindowsDimensions";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function MovieGridSkeleton() {
  // const { width } = useWindowDimensions();
  // const [skeletons, setSkeletons] = useState([1, 2, 3, 4, 5]);

  // const skeletonsForScreens = [
  //   { width: 0, count: 2 },
  //   { width: 640, count: 3 },
  //   { width: 1024, count: 4 },
  //   { width: 1280, count: 5 },
  // ];

  // useEffect(() => {
  //   console.log("width", width);
  //   skeletonsForScreens.forEach((screen) => {
  //     if (width >= screen.width) {
  //       const skeletons = Array.from({ length: screen.count }, (v, i) => i);
  //       setSkeletons(skeletons);
  //     }
  //   });
  // }, [width]);

  return (
    <Skeleton
      className={"!rounded-xl md:h-[485px] h-[335px]"}
      containerClassName=""
    />
  );
}
