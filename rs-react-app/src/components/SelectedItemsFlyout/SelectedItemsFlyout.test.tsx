import '@testing-library/jest-dom/vitest';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test, vi } from "vitest";
import { store } from "../../store/store";
import SelectedItemsFlyout from "./SelectedItemsFlyout";
import { screen  } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PaginationContext } from "../../context/PaginationContext";
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../../store/pokemonSlice';

const testStore = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },

  preloadedState: {
    pokemon: {
      results: [],
      loading: false,
      errorMessage: '',
      totalCount: 0,
      lastSearch: '',
      crash: false,

      selectedItems: [
        {
          name: 'pikachu',
          description: 'Abilities: static',
        },
      ],
        currentPage: 1,

    },
  },
});
describe('SelectedItemsFlyout', () => {
    test('does not render when no items selected', () => {
  render(
    <Provider store={store}>
  <MemoryRouter>
    <PaginationContext.Provider
      value={{
        page: 1,
        totalPages: 1,
        setPage: vi.fn(),
        setTotalCount: vi.fn(),
      }}
    >
      <SelectedItemsFlyout/>
    </PaginationContext.Provider>
  </MemoryRouter>
  </Provider>
  );

  expect(
    screen.queryByText(/Selected/i)
  ).not.toBeInTheDocument();
});
test('downloads csv file', async () => {
  const user = userEvent.setup();

  globalThis.URL.createObjectURL = vi.fn();

  HTMLAnchorElement.prototype.click =
    vi.fn();

  render(
    <Provider store={testStore}>
      <SelectedItemsFlyout />
    </Provider>
  );

  await user.click(
    screen.getByRole('button', {
      name: /download/i,
    })
  );

  expect(
    URL.createObjectURL
  ).toHaveBeenCalled();

  expect(
    HTMLAnchorElement.prototype.click
  ).toHaveBeenCalled();
});
})