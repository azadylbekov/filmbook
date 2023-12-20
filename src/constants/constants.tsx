import { createRef } from "react";
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
    ref: createRef(),
  },
  {
    title: "Movies",
    href: "/movies",
    ref: createRef(),
  },
  {
    title: "Tv Series",
    href: "/tvseries",
    ref: createRef(),
  },
  {
    title: "Favorites",
    href: "/favorites",
    ref: createRef(),
  },
  {
    title: "Watchlist",
    href: "/watchlist",
    ref: createRef(),
  },
  {
    title: "Rated",
    href: "/rated",
    ref: createRef(),
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

export const CATEGORY_OPTIONS = [
  { label: "Movies", value: "movies" },
  { label: "Tv Series", value: "tv" },
];
