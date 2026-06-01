import '@testing-library/jest-dom/vitest';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi, type Mock } from 'vitest';

import PokemonDetails from './PokemonDetails';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loader while fetching', () => {
    globalThis.fetch = vi.fn(
      () =>
        new Promise(() => {})
    ) as Mock;

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route
            path="/pokemon/:name"
            element={<PokemonDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
    screen.getByTestId('loader')
    ).toBeInTheDocument();
  });

  test('renders pokemon details after successful fetch', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: {
          front_default: 'pikachu.png',
        },
        abilities: [
          {
            ability: {
              name: 'static',
            },
          },
          {
            ability: {
              name: 'lightning-rod',
            },
          },
        ],
      }),
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route
            path="/pokemon/:name"
            element={<PokemonDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('pikachu')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Height: 4')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Weight: 60')
    ).toBeInTheDocument();

    expect(
      screen.getByText('static')
    ).toBeInTheDocument();

    expect(
      screen.getByText('lightning-rod')
    ).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
  });

  test('shows api error message', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/unknown']}>
        <Routes>
          <Route
            path="/pokemon/:name"
            element={<PokemonDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Failed to load pokemon')
    ).toBeInTheDocument();
  });

  test('shows network error message', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(
      new Error('Network error')
    );

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route
            path="/pokemon/:name"
            element={<PokemonDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Network error')
    ).toBeInTheDocument();
  });

  test('navigates to search page when close button clicked', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: {
          front_default: 'pikachu.png',
        },
        abilities: [],
      }),
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route
            path="/pokemon/:name"
            element={<PokemonDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    const button = await screen.findByRole(
      'button',
      {
        name: 'Close',
      }
    );

    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(
      '/search'
    );
  });

  test('does not fetch if name param is missing', async () => {
    globalThis.fetch = vi.fn();

    render(
      <MemoryRouter initialEntries={['/pokemon']}>
        <Routes>
          <Route
            path="/pokemon"
            element={<PokemonDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(globalThis.fetch).not.toHaveBeenCalled();
    });
  });
});