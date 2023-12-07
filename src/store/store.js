import { configureStore } from "@reduxjs/toolkit"
import genreReducer from './reducers/genreSlice'
import favoriteReducer from './reducers/favoriteSlice';
import watchlistReducer from './reducers/watchlistSlice';
import ratingReducer from './reducers/ratingSlice';
import guestIdReducer from "./reducers/guestIdSlice";
import countriesReducer from './reducers/countriesSlice';
import searchReducer from './reducers/searchSlice';
import { filmBookAPI } from '@/services/FilmBookService';



export default configureStore({
	reducer: {
		genre: genreReducer,
		favorite: favoriteReducer,
		watchlist: watchlistReducer,
		rating: ratingReducer,
		guestId: guestIdReducer,
		countries: countriesReducer,
		search: searchReducer,
		[filmBookAPI.reducerPath]: filmBookAPI.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmBookAPI.middleware),
})