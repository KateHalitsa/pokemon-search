import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, test, expect, afterEach, beforeEach } from "vitest";
import App from "../../App";
import { fetchPokemon } from "../../components/api/pokemonApi";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';

vi.mock("../../components/api/pokemonApi", () => ({
  fetchPokemon: vi.fn(),
}));
beforeEach(() => {
  const store: Record<string, string> = {};

  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach(k => delete store[k]);
    },
  });
});        
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();

  });

describe("API mock test", () => {

  test("renders pokemon data", async () => {

    (fetchPokemon as any).mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "pikachu",
        abilities: [
          { ability: { name: "static" } }
        ]
      })
    });

    render(<App />);
    const input = screen.getByPlaceholderText("Search...");
await userEvent.type(input, "pikachu");

await userEvent.click(screen.getByText("Search"));

    expect(await screen.findByText("pikachu")).toBeInTheDocument();
    expect(await screen.findByText(/static/i)).toBeInTheDocument();
  });

  test("shows error message when API fails", async () => {
  (fetchPokemon as any).mockResolvedValue({
  ok: false,
  status: 500,
  json: async () => ({})
});

  render(<App />);
   const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "pikachu");

    await userEvent.click(screen.getByText("Search"));

      expect(
        await screen.findByText("Server is temporarily unavailable")
      ).toBeInTheDocument();
});

});