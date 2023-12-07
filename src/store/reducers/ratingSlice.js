import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '@/services/api';

export const fetchRatingMovies = createAsyncThunk('ratingMovies', async () => {
	const guestSessionId = localStorage.getItem('guestSessionId');
	
	const response = await api.get(`account/${guestSessionId}/rated/movies`);
	return response.data.results;
})

export const fetchRatingTv = createAsyncThunk('ratingTv', async () => {
	const guestSessionId = localStorage.getItem('guestSessionId');
	
	const response = await api.get(`account/${guestSessionId}/rated/tv`);
	return response.data.results;
})

export const ratingSlice = createSlice({
	name: 'rating',
	initialState: {
		movies: [],
		areMoviesSet: false,
		tv: [],
		isTvSet: false
	},
	reducers: {
		setRatingMovies: (state, action) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		},
		setRatingTv: (state, action) => {
			state.tv = action.payload;
			state.isTvSet = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRatingMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		}),
		builder.addCase(fetchRatingTv.fulfilled, (state, action) => {
			state.tv = action.payload;
			state.isTvSet = true;
		})
	}
})


export const { setRatingMovies, setRatingTv } = ratingSlice.actions;

export default ratingSlice.reducer;