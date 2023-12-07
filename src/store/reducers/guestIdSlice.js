import { createSlice } from "@reduxjs/toolkit";


export const guestIdSlice = createSlice({
	name: 'guestId',
	initialState: {
		value: null
	},
	reducers: {
		setGuestId: (state) => {
			const guestSessionId = localStorage.getItem('guestSessionId');
			if (guestSessionId) {
				state.value = guestSessionId;
			} else {
				state.value = null
			}
		},
	}
})


export const { setGuestId } = guestIdSlice.actions;

export default guestIdSlice.reducer;