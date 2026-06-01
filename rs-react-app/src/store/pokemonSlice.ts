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
  selectedItems: Item[];
  currentPage: number;

};

const initialState: State = {
    results: [],
    loading: false,
    errorMessage: '',
    totalCount: 0,
    lastSearch: '',
    crash: false,
    selectedItems: [],
    currentPage: 1,

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
    setCurrentPage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.currentPage = action.payload;
    },
    setLastSearch: (
      state,
      action: PayloadAction<string>
    ) => {
      state.lastSearch =
        action.payload;
    },
    toggleSelectedItem: (
  state,
  action: PayloadAction<Item>
) => {
  const exists = state.selectedItems.find(
    (item) => item.name === action.payload.name
  );

  if (exists) {
    state.selectedItems =
      state.selectedItems.filter(
        (item) =>
          item.name !== action.payload.name
      );
  } else {
    state.selectedItems.push(action.payload);
  }
}, 
    clearSelectedItems: (state) => {
    state.selectedItems = [];
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
  toggleSelectedItem,
  clearSelectedItems,
  setCurrentPage,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;