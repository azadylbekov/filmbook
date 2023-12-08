import HomeSlider from "@/components/HomeSlider/HomeSlider";
import Layout from "@/components/Layout/Layout";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import { GENRES } from "@/utils/const";

export default function Home() {
  return (
    <div>
      <HomeSlider />
      {GENRES.map((genre) => (
        <div key={genre.id}>
          <MovieGrid genre={genre} />
        </div>
      ))}
    </div>
  );
}
