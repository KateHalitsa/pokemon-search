import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, test, expect, afterEach, beforeEach } from "vitest";
import App, { type PokemonDetails } from "../../App";
import { fetchPokemon } from "../../components/api/pokemonApi";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

vi.mock("../../components/api/pokemonApi", () => ({
  fetchPokemon: vi.fn(),
}));

const mockedFetchPokemon = vi.mocked(fetchPokemon);

beforeEach(() => {
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
    const mockedFetchPokemon = vi.mocked(fetchPokemon);

    mockedFetchPokemon.mockResolvedValue({
      ok: true,
      json: async (): Promise<PokemonDetails> => ({
        name: "pikachu",
        abilities: [{ ability: { name: "static" } }],
      }),
    } as Response);

    render(<App />);

    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByText("Search");

    await user.type(input, "pikachu");
    await user.click(button);

    expect(await screen.findByText("pikachu")).toBeInTheDocument();
    expect(await screen.findByText(/static/i)).toBeInTheDocument();
  });

  test("shows error message when API fails", async () => {
    const user = userEvent.setup();

    mockedFetchPokemon.mockRejectedValue(new Error("Network error"));

    render(<App />);

    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByText("Search");

    await user.type(input, "pikachu");
    await user.click(button);

    expect(
      await screen.findByText("Network connection error")
    ).toBeInTheDocument();
  });
});