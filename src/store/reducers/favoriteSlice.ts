import { createSlice } from "@reduxjs/toolkit";
import { IMovie, IShow } from "@/types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { getFavoriteList } from "@/services/FilmBookService";

interface FavoriteState { 
	movies: Array<IMovie>,
	areMoviesSet: boolean,
	tv: Array<IShow>,
	isTvSet: boolean
}

const initialState: FavoriteState = { 
	movies: [],
	areMoviesSet: false,
	tv: [],
	isTvSet: false
}

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		setFavoriteMovies: (state, action: PayloadAction<IMovie[]>) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		},
		setFavoriteTv: (state, action: PayloadAction<IShow[]>) => {
			state.tv = action.payload;
			state.isTvSet = true;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(getFavoriteList.matchFulfilled, (state, action) => {
			if (action.meta.arg.originalArgs.category == 'movies') {
				state.movies = action.payload.results;
				state.areMoviesSet = true;
			}
			if (action.meta.arg.originalArgs.category == 'tv') {
				state.tv = action.payload.results;
				state.isTvSet = true;
			}
		})
	}
})


export const { setFavoriteMovies, setFavoriteTv } = favoriteSlice.actions;


export const favoriteConstructor  = favoriteSlice.reducer;