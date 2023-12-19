import HomeSlider from "@/components/HomeSlider/HomeSlider";
import MovieGrid from "@/components/MovieGrid/MovieGrid";
import { GENRES } from "@/constants/const";

const Home = () => {

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

export default Home;
