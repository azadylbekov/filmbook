import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

import { ICountry, IGenre, IMovie, IMovies, IPerson, IShow, IShows, ITrailers } from "@/types";

interface PageQuery {
  page: number | string,
  query: string
}

type IdType = number | string | undefined

type NumberOrString = number | string;

export const filmBookAPI = createApi({
  reducerPath: "filmBookAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getNewGuestSessionId: build.query<String, void>({
      query: () => "authentication/guest_session/new"
    }),
    getPopularMovies: build.query<IMovies, void>({
      query: () =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    }),
    getMoviesWithFilter: build.query<IMovies, PageQuery>({
      query: ({ page, query }) => `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${query}`
    }),
    getShowsWithFilter: build.query<IShows, PageQuery>({
      query: ({ page, query }) => `discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}${query}`
    }),
    getMovieGenres: build.query<IGenre[], void>({
      query: () => `genre/movie/list?language=en`
    }),
    getGenres: build.query<IGenre[], string>({
      query: (type) => `genre/${type}/list?language=en`
    }),
    getCountries: build.query<ICountry[], void>({
      query: () => `configuration/countries?language=en-US`
    }),
    getMovieById: build.query<IMovie, IdType>({
      query: (id) => `movie/${id}`
    }),
    getShowById: build.query<IShow, IdType>({
      query: (id) => `tv/${id}`
    }),
    getMoviesByGenre: build.query<IMovies, IdType>({
      query: (id) => `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    }),
    getMovieCredits: build.query<[], IdType>({
      query: (id) => `movie/${id}/credits`
    }),
    getShowCredits: build.query<[], IdType>({
      query: (id) => `tv/${id}/credits`
    }),
    getCredits: build.query({
      query: ({ id, type }) => `${type}/${id}/credits`
    }),
    getSimilarMovies: build.query<IMovies, IdType>({
      query: (id) => `movie/${id}/similar`
    }),
    getSimilarShows: build.query<IShows, IdType>({
      query: (id) => `tv/${id}/similar`
    }),
    getVideos: build.query<ITrailers, {type: string, id: IdType}>({
      query: ({ type, id }) => `/${type}/${id}/videos`
    }),
    getSearchResults: build.query<IShows & IMovies, PageQuery>({
      query: ({ query, page }) => `/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`
    }),
    getPerson: build.query<IPerson, IdType>({
      query: (id) => `person/${id}`
    }),
    getMoviesWithPerson: build.query<IMovies, {page: NumberOrString, id: IdType}>({
      query: ({ page, id }) => `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_cast=${id}`
    }),
    getFavoriteList: build.query<IShows & IMovies, {guestSessionId: string | null, category: string}>({
      query: ({ guestSessionId, category }) => `account/${guestSessionId}/favorite/${category}`
    }),
    getWatchlist: build.query<IShows & IMovies, {guestSessionId: string | null, category: string}>({
      query: ({ guestSessionId, category }) => `account/${guestSessionId}/watchlist/${category}`
    }),
    getRatingList: build.query<IShows & IMovies, {guestSessionId: string | null, category: string}>({
      query: ({ guestSessionId, category }) => `account/${guestSessionId}/rated/${category}`
    }),
    toggleFavorite: build.mutation({
      query: ({ guestSessionId, body }) => ({
        url: `account/${guestSessionId}/favorite`,
        method: "POST",
        body: body
      }),
    }),
    toggleWatchlist: build.mutation({
      query: ({ guestSessionId, body }) => ({
        url: `account/${guestSessionId}/watchlist`,
        method: "POST",
        body: body
      }),
    }),
    deleteRating: build.mutation({
      query: ({ id, guestSessionId, type }) => ({
        url: `${type}/${id}/rating?guest_session_id=${guestSessionId}`,
        method: "DELETE"
      }),
    }),
    changeRating: build.mutation({
      query: ({ id, guestSessionId, body, type }) => ({
        url: `${type}/${id}/rating?guest_session_id=${guestSessionId}`,
        method: "POST",
        body: body
      }),
    }),
  }),
});

export const {
  useLazyGetNewGuestSessionIdQuery,
  useGetPopularMoviesQuery,
  useLazyGetMoviesWithFilterQuery,
  useLazyGetShowsWithFilterQuery,
  useGetMovieGenresQuery,
  useLazyGetGenresQuery,
  useLazyGetCountriesQuery,
  useGetMovieByIdQuery,
  useGetShowByIdQuery,
  useGetMoviesByGenreQuery,
  useLazyGetMovieCreditsQuery,
  useLazyGetShowCreditsQuery,
  useGetCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetSimilarShowsQuery,
  useGetVideosQuery,
  useLazyGetSearchResultsQuery,
  useGetPersonQuery,
  useLazyGetMoviesWithPersonQuery,
  useLazyGetFavoriteListQuery,
  useLazyGetWatchlistQuery,
  useLazyGetRatingListQuery,
  useToggleFavoriteMutation,
  useDeleteRatingMutation,
  useToggleWatchlistMutation,
  useChangeRatingMutation,
} = filmBookAPI;

export const {
  getNewGuestSessionId,
  getPopularMovies,
  getMoviesWithFilter,
  getShowsWithFilter,
  getMovieGenres,
  getGenres,
  getCountries,
  getMovieById,
  getShowById,
  getMoviesByGenre,
  getMovieCredits,
  getShowCredits,
  getCredits,
  getSimilarMovies,
  getSimilarShows,
  getVideos,
  getSearchResults,
  getPerson,
  getMoviesWithPerson,
  getFavoriteList,
  getWatchlist,
  getRatingList,
  toggleFavorite,
  deleteRating,
  toggleWatchlist,
  changeRating,
} = filmBookAPI.endpoints;
