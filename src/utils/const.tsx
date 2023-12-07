
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

export const sortByOptions = [
  { value: "popularity.asc", label: "Popularity", icon: <FaCaretUp /> },
  { value: "popularity.desc", label: "Popularity", icon: <FaCaretDown /> },
  { value: "vote_average.asc", label: "Voting", icon: <FaCaretUp /> },
  { value: "vote_average.desc", label: "Voting", icon: <FaCaretDown /> },
];

export const NAV_LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Movies",
    href: "/movies",
  },
  {
    title: "Tv Series",
    href: "/tvseries",
  },
  {
    title: "Favorites",
    href: "/favorites",
  },
  {
    title: "Watchlist",
    href: "/watchlist",
  },
  {
    title: "Rated",
    href: "/rated",
  },
];

export const GENRES = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
];
