import { createSlice } from "@reduxjs/toolkit";

interface GuestIdState {
  value: string | null;
}

const initialState: GuestIdState = {
  value: null,
};

export const guestIdSlice = createSlice({
  name: "guestId",
  initialState,
  reducers: {
    setGuestId: (state) => {
      const guestSessionId = localStorage.getItem("guestSessionId");
      if (guestSessionId) {
        state.value = guestSessionId;
      } else {
        state.value = null;
      }
    },
  },
});

export const { setGuestId } = guestIdSlice.actions;

export const guestIdConstructor = guestIdSlice.reducer;
