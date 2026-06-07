import { createSlice } from "@reduxjs/toolkit";
import { getNames } from "country-list";

const initialState: string[] = getNames();

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;