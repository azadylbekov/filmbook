import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OffcanvasState {
  isMobOffcanvasOpen: boolean;
  isSearchOffcanvasOpen: boolean;
}

const initialState: OffcanvasState = {
  isMobOffcanvasOpen: false,
  isSearchOffcanvasOpen: false,
};

export const offcanvasSlice = createSlice({
  name: "offcanvas",
  initialState,
  reducers: {
    setMobCanvas: (state, action: PayloadAction<boolean>) => {
      state.isMobOffcanvasOpen = action.payload;
    },
    setSearchCanvas: (state, action: PayloadAction<boolean>) => {
      state.isSearchOffcanvasOpen = action.payload;
    },
  },
});

export const { setMobCanvas, setSearchCanvas } = offcanvasSlice.actions;

export const offcanvasConstructor = offcanvasSlice.reducer;
