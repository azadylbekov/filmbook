import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '@/services/api';

export const fetchGenres = createAsyncThunk(
	'genres',
	async (userId, thunkAPI) => {
		const response = await api.get('genre/movie/list?language=en');
		return response.data.genres;
	}
)

export const fetchTvGenres = createAsyncThunk('tvGenres', async () => {
	const response = await api.get('genre/tv/list?language=en');
	return response.data.genres;
})

export const genreSlice = createSlice({
	name: 'genre',
	initialState: {
		movie: [],
		tv: [],
	},
	reducers: {
		setMovieGenres: (state, action) => {
			state.movie = action.payload
		},
		setTvGenres: (state, action) => {
			state.tv = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchGenres.fulfilled, (state, action) => {
			state.movie = action.payload
		})
		builder.addCase(fetchTvGenres.fulfilled, (state, action) => {
			state.tv = action.payload
		})
	}
})


export const { setMovieGenres, setTvGenre } = genreSlice.actions;

export default genreSlice.reducer;