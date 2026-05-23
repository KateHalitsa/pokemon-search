import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Item } from '../App';

type State = {
  results: Item[];
  loading: boolean;
  crash:boolean;
  errorMessage: string;
  totalCount: number;
  lastSearch: string;
};

const initialState: State = {
    results: [],
    loading: false,
    errorMessage: '',
    totalCount: 0,
    lastSearch: '',
    crash: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,

  reducers: {
    setResults: (
      state,
      action: PayloadAction<Item[]>
    ) => {
      state.results = action.payload;
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
    setCrash: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.crash = action.payload;
    },

    setErrorMessage: (
      state,
      action: PayloadAction<string>
    ) => {
      state.errorMessage =
        action.payload;
    },

    setTotalCount: (
      state,
      action: PayloadAction<number>
    ) => {
      state.totalCount =
        action.payload;
    },

    setLastSearch: (
      state,
      action: PayloadAction<string>
    ) => {
      state.lastSearch =
        action.payload;
    },
  },
});

export const {
  setResults,
  setLoading,
  setCrash,
  setErrorMessage,
  setTotalCount,
  setLastSearch,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;