import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

import { IMovie, IMovies } from "@/types/types";


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
    getNewGuestSessionId: build.query<String, null>({
      query: () => "authentication/guest_session/new"
    }),
    getPopularMovies: build.query<IMovies, undefined>({
      query: () =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    }),
    getMoviesWithFilter: build.query({
      query: ({ page, query }) => `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}${query}`
    }),
    getShowsWithFilter: build.query({
      query: ({ page, query }) => `discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}${query}`
    }),
    getMovieGenres: build.query({
      query: () => `genre/movie/list?language=en`
    }),
    getMovieById: build.query({
      query: (id) => `movie/${id}`
    }),
    getShowById: build.query({
      query: (id) => `tv/${id}`
    }),
    getMoviesByGenre: build.query({
      query: (id) => `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    }),
    getMovieCredits: build.query({
      query: (id) => `movie/${id}/credits`
    }),
    getShowCredits: build.query({
      query: (id) => `tv/${id}/credits`
    }),
    getCredits: build.query({
      query: ({ id, type }) => `${type}/${id}/credits`
    }),
    getSimilarMovies: build.query({
      query: (id) => `movie/${id}/similar`
    }),
    getSimilarShows: build.query({
      query: (id) => `tv/${id}/similar`
    }),
    getVideos: build.query({
      query: ({ type, id }) => `/${type}/${id}/videos`
    }),
    getSearchResults: build.query({
      query: ({ query, page }) => `/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`
    }),
    getPerson: build.query({
      query: (id) => `person/${id}`
    }),
    getMoviesWithPerson: build.query({
      query: ({ page, id }) => `discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_cast=${id}`
    }),
    getFavoriteList: build.query({
      query: ({ guestSessionId, category }) => `account/${guestSessionId}/favorite/${category}`
    }),
    getWatchlist: build.query({
      query: ({ guestSessionId, category }) => `account/${guestSessionId}/watchlist/${category}`
    }),
    getRatingList: build.query({
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
