import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Search from "./pages/Search";
import Person from "./pages/Person";
import ScrollToTop from "./components/ScrollToTop";
import TvSeries from "./pages/TvSeries";
import Show from "./pages/Show";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import RatingList from "./pages/RatingList";
import Layout from "./components/Layout/Layout";
import useFetchLists from "./hooks/useFetchLists";

function App() {
  useFetchLists();
  
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movie/:movieId" element={<Movie />} />
          <Route path="search" element={<Search />} />
          <Route path="person/:personId" element={<Person />} />
          <Route path="tvseries" element={<TvSeries />} />
          <Route path="show/:showId" element={<Show />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="rated" element={<RatingList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
