import { configureStore } from "@reduxjs/toolkit";
import { genreConstructor } from "./reducers/genreSlice";
import { favoriteConstructor } from "./reducers/favoriteSlice";
import { watchlistConstructor } from "./reducers/watchlistSlice";
import { ratingConstructor } from "./reducers/ratingSlice";
import { guestIdConstructor } from "./reducers/guestIdSlice";
import { contriesContstructor } from "./reducers/countriesSlice";
import { searchConstructor } from "./reducers/searchSlice";
import { offcanvasConstructor } from "./reducers/offcanvasSlice";
import { filmBookAPI } from "@/services/FilmBookService";

export const store = configureStore({
  reducer: {
    genre: genreConstructor,
    favorite: favoriteConstructor,
    watchlist: watchlistConstructor,
    rating: ratingConstructor,
    guestId: guestIdConstructor,
    countries: contriesContstructor,
    search: searchConstructor,
    offcanvas: offcanvasConstructor,
    [filmBookAPI.reducerPath]: filmBookAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filmBookAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
