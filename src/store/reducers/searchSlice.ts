import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  value: string;
}

const initialState: SearchState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      console.log("search value is ", action.payload);
      state.value = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const searchConstructor = searchSlice.reducer;
