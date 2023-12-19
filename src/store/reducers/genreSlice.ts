import { createSlice } from "@reduxjs/toolkit";
import { IGenre } from "@/types/types";
import type { PayloadAction } from '@reduxjs/toolkit'
import { getGenres } from "@/services/FilmBookService";

interface GenreState { 
	movie: Array<IGenre>,
	tv: Array<IGenre>,
}

const initialState: GenreState = { 
	movie: [],
	tv: []
}

export const genreSlice = createSlice({
	name: 'genre',
	initialState,
	reducers: {
		setMovieGenres: (state, action: PayloadAction<IGenre[]>) => {
			state.movie = action.payload
		},
		setTvGenres: (state, action: PayloadAction<IGenre[]>) => {
			state.tv = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(getGenres.matchFulfilled, (state, action) => {
			if (action.meta.arg.originalArgs == 'movies') {
				state.movie = action.payload.genres;
			}
			if (action.meta.arg.originalArgs == 'tv') {
				state.tv = action.payload.genres;
			}
		})
	}
})


export const { setMovieGenres, setTvGenres } = genreSlice.actions;

export const genreConstructor = genreSlice.reducer;