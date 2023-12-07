import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from '@/services/api';

export const fetchCountries = createAsyncThunk('countries', async () => {
	const response = await api.get('configuration/countries?language=en-US');
	return response.data;
})

export const countriesSlice = createSlice({
	name: 'countries',
	initialState: {
		value: [],
	},
	reducers: {
		setCountries: (state, action) => {
			state.value = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCountries.fulfilled, (state, action) => {
			state.value = action.payload
		})
	}
})


export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;