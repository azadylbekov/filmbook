import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICountry } from "@/types/types";
import { getCountries } from "@/services/FilmBookService";

interface CountriesState {
  value: ICountry[];
}

const initialState: CountriesState = {
  value: [],
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<ICountry[]>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(getCountries.matchFulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { setCountries } = countriesSlice.actions;

export const contriesContstructor = countriesSlice.reducer;
