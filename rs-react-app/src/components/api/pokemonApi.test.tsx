import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, test, expect, afterEach, beforeEach, type MockedFunction } from "vitest";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./pokemonApi";
import pokemonReducer from '../../store/pokemonSlice';


const makeStore = () =>
  configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
beforeEach(() => {
  globalThis.fetch = vi.fn();

  const store: Record<string, string> = {};

  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("API mock test", () => {
  test("renders pokemon data", async () => {
     const user = userEvent.setup();
     const mockedFetch = fetch as MockedFunction<typeof fetch>;

  mockedFetch
  .mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      count: 1,
      results: [],
    }),
  }as Response)
  .mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      name: "pikachu",
      abilities: [
        {
          ability: {
            name: "static",
          },
        },
      ],
    }),
  }as Response);
  render(
    <Provider store={makeStore()}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText("Search...");
  const button = screen.getByText("Search");

  await user.type(input, "pikachu");
  await user.click(button);

  expect(await screen.findByText("pikachu")).toBeInTheDocument();
  expect(await screen.findByText(/static/i)).toBeInTheDocument();
  });

  test("shows error message when API fails", async () => {
    const user = userEvent.setup();
     const mockedFetch = fetch as MockedFunction<typeof fetch>;

    mockedFetch
.mockRejectedValue(new Error("Network error"));

    render(
          <Provider store={makeStore()}>
            <MemoryRouter>
                <App />
            </MemoryRouter>
          </Provider>
    );
    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByText("Search");

    await user.type(input, "pikachu");
    await user.click(button);

    expect(
      await screen.findByText("Network connection error")
    ).toBeInTheDocument();
  });
});