import { createSlice } from "@reduxjs/toolkit";


export const searchSlice = createSlice({
	name: 'search',
	initialState: {
		value: ''
	},
	reducers: {
		setSearch: (state, action) => {
			console.log('search value is ', action.payload);
			state.value = action.payload
		},
	}
})


export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;