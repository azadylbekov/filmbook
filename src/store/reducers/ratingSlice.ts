import { createSlice } from "@reduxjs/toolkit";
import { IMovie, IShow } from "@/types/types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { getRatingList } from "@/services/FilmBookService";

interface RatingState { 
	movies: Array<IMovie>,
	areMoviesSet: boolean,
	tv: Array<IShow>,
	isTvSet: boolean
}

const initialState: RatingState = { 
	movies: [],
	areMoviesSet: false,
	tv: [],
	isTvSet: false
}

export const ratingSlice = createSlice({
	name: 'rating',
	initialState,
	reducers: {
		setRatingMovies: (state, action: PayloadAction<IMovie[]>) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		},
		setRatingTv: (state, action: PayloadAction<IShow[]>) => {
			state.tv = action.payload;
			state.isTvSet = true;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(getRatingList.matchFulfilled, (state, action) => {
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


export const { setRatingMovies, setRatingTv } = ratingSlice.actions;

export const ratingConstructor = ratingSlice.reducer;