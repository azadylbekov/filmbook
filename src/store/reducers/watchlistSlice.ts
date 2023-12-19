import { createSlice } from "@reduxjs/toolkit";
import { IMovie, IShow } from "@/types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { getWatchlist } from "@/services/FilmBookService";

interface WatchlistState { 
	movies: Array<IMovie>,
	areMoviesSet: boolean,
	tv: Array<IShow>,
	isTvSet: boolean
}

const initialState: WatchlistState = { 
	movies: [],
	areMoviesSet: false,
	tv: [],
	isTvSet: false
}

export const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState,
	reducers: {
		setWatchlistMovies: (state, action: PayloadAction<IMovie[]>) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		},
		setWatchlistTv: (state, action: PayloadAction<IShow[]>) => {
			state.tv = action.payload;
			state.isTvSet = true;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(getWatchlist.matchFulfilled, (state, action) => {
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


export const { setWatchlistMovies, setWatchlistTv } = watchlistSlice.actions;

export const watchlistConstructor = watchlistSlice.reducer;