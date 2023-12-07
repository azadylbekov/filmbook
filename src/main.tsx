import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/main.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Movie from "./pages/Movie.tsx";
import Movies from "./pages/Movies.tsx";
import { Provider } from "react-redux";
import store from "@/store/store";
import Search from "./pages/Search.tsx";
import Person from "./pages/Person.tsx";
import TvSeries from "./pages/TvSeries.tsx";
import Show from "./pages/Show.tsx";
import Favorites from "./pages/Favorites.tsx";
import Watchlist from "./pages/Watchlist.tsx";
import RatingList from "./pages/RatingList.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     errorElement: <NotFound />,
//   },
//   {
//     path: "movie/:movieId",
//     element: <Movie />,
//   },
//   {
//     path: "movies",
//     element: <Movies />,
//   },
//   {
//     path: "search",
//     element: <Search />,
//   },
//   {
//     path: "person/:personId",
//     element: <Person />,
//   },
//   {
//     path: "tvseries",
//     element: <TvSeries />,
//   },
//   {
//     path: "show/:showId",
//     element: <Show />,
//   },
//   {
//     path: "favorites",
//     element: <Favorites />,
//   },
//   {
//     path: "watchlist",
//     element: <Watchlist />,
//   },
//   {
//     path: "rated",
//     element: <RatingList />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SkeletonTheme baseColor="#232323" highlightColor="#333333">
      <Provider store={store}>
        {/* <RouterProvider router={router} /> */}
        <App />
      </Provider>
  </SkeletonTheme>
);
