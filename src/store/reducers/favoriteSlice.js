import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '@/services/api';

export const fetchFavoriteMovies = createAsyncThunk('favoriteMovies', async () => {
	const guestSessionId = localStorage.getItem('guestSessionId');
	
	const response = await api.get(`account/${guestSessionId}/favorite/movies`);
	return response.data.results;
})

export const fetchFavoriteTv = createAsyncThunk('favoriteTv', async () => {
	const guestSessionId = localStorage.getItem('guestSessionId');
	
	const response = await api.get(`account/${guestSessionId}/favorite/tv`);
	return response.data.results;
})

export const favoriteSlice = createSlice({
	name: 'favorite',
	initialState: {
		movies: [],
		areMoviesSet: false,
		tv: [],
		isTvSet: false
	},
	reducers: {
		setFavoriteMovies: (state, action) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		},
		setFavoriteTv: (state, action) => {
			state.tv = action.payload;
			state.isTvSet = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
			state.movies = action.payload;
			state.areMoviesSet = true;
		}),
		builder.addCase(fetchFavoriteTv.fulfilled, (state, action) => {
			state.tv = action.payload;
			state.isTvSet = true;
		})
	}
})


export const { setFavoriteMovies, setFavoriteTv } = favoriteSlice.actions;

export default favoriteSlice.reducer;