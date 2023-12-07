import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '@/services/api';

export const fetchWatchlistMovies = createAsyncThunk('watchlistMovies', async () => {
	const guestSessionId = localStorage.getItem('guestSessionId');
	
	const response = await api.get(`account/${guestSessionId}/watchlist/movies`);
	return response.data.results;
})

export const fetchWatchlistTv = createAsyncThunk('watchlistTv', async () => {
	const guestSessionId = localStorage.getItem('guestSessionId');
	
	const response = await api.get(`account/${guestSessionId}/watchlist/tv`);
	return response.data.results;
})

export const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState: {
		movies: [],
		areMoviesSet: false,
		tv: [],
		isTvSet: false
	},
	reducers: {
		setWatchlistMovies: (state, action) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		},
		setWatchlistTv: (state, action) => {
			state.tv = action.payload;
			state.isTvSet = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWatchlistMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		}),
		builder.addCase(fetchWatchlistTv.fulfilled, (state, action) => {
			state.tv = action.payload;
			state.isTvSet = true;
		})
	}
})


export const { setWatchlistMovies, setWatchlistTv } = watchlistSlice.actions;

export default watchlistSlice.reducer;