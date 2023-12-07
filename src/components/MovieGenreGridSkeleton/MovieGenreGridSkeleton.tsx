import Container from "@/components/Container";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useWindowDimensions from "@/hooks/useWindowsDimensions";
import { useEffect, useState } from "react";


export default function MovieGenreGridSkeleton() {
  const genres = [1, 2, 3, 4, 5];

  const { width } = useWindowDimensions();
  const [skeletons, setSkeletons] = useState([1, 2, 3, 4, 5]);

  const skeletonsForScreens = [
    { width: 0, count: 2 },
    { width: 640, count: 3 },
    { width: 1024, count: 4 },
    { width: 1280, count: 5 },
  ];

  useEffect(() => {
    skeletonsForScreens.forEach((screen) => {
      if (width >= screen.width) {
        const skeletons = Array.from({ length: screen.count }, (v, i) => i);
        setSkeletons(skeletons);
      }
    });
  }, [width]);

  return (
    <div className="lg:my-6 my-4">
      <Container>
        {genres.map((genre) => (
          <div key={genre}>
            <SkeletonTheme baseColor="#232323" highlightColor="#333333">
              <Skeleton className="!rounded-xl mb-2" width={200} height={30} />
              <div className="xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid gap-4 grid-cols-2 mb-2">
                {skeletons.map((skeleton) => (
                  <Skeleton
                    className={"!rounded-xl md:h-[400px] h-[250px]"}
                    key={skeleton}
                  />
                ))}
              </div>
            </SkeletonTheme>
          </div>
        ))}
      </Container>
    </div>
  );
}
