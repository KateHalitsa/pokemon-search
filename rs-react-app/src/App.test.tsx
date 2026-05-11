import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { test, expect, beforeEach, vi, describe } from 'vitest';
import '@testing-library/jest-dom/vitest';
import type { MockedFunction } from 'vitest';

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

globalThis.fetch = vi.fn();

describe('Main App Component Tests',()=>{
    describe('Integration Tests',()=>{
    test('Makes initial API call on component mount',async()=>{
        const mockedFetch = fetch as MockedFunction<typeof fetch>;

        mockedFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
            results: [
                {
                name: "pikachu",
                url: "https://pokeapi.co/api/v2/pokemon/1/"
                }
            ]
            })
        } as Response);

        render(<App />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });

        })
        test('Manages loading states during API calls', async () => {
        vi.stubGlobal('fetch', vi.fn());

        const mockedFetch = vi.mocked(fetch);

        mockedFetch.mockResolvedValue({
            ok: true,
            json: async () => ({
            results: [],
            }),
        } as Response);

        render(<App />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();

        await waitFor(() => {
            expect(
            screen.queryByTestId('loader')
            ).not.toBeInTheDocument();
        });
        });
    })
    describe('API Integration Tests',()=>{
        test('Calls API with correct parameters',async()=>{
            globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
            results: [],
            }),
        });

        render(<App />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
            'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
            );
        });
        })
        test('Handles successful API responses', async () => {
            globalThis.fetch = vi.fn()
                .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    results: [
                    {
                        name: 'pikachu',
                        url: 'https://pokeapi.co/api/v2/pokemon/25/',
                    },
                    ],
                }),
                })
                .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    name: 'pikachu',
                    abilities: [
                    {
                        ability: {
                        name: 'static',
                        },
                    },
                    ],
                }),
                });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText('pikachu')).toBeInTheDocument();
            });

            expect(
                screen.getByText('Abilities: static')
            ).toBeInTheDocument();
        });
        describe('Handles API error responses',()=>{
            test('Handles 404 API responses', async () => {
                globalThis.fetch = vi.fn().mockResolvedValue({
                    ok: false,
                    status: 404,
                });

                render(<App />);

                await waitFor(() => {
                    expect(
                    screen.getByText('Nothing found for your search')
                    ).toBeInTheDocument();
                });
            });
            test('Handles 500 API responses', async () => {
                globalThis.fetch = vi.fn().mockResolvedValue({
                    ok: false,
                    status: 500,
                });

                render(<App />);

                await waitFor(() => {
                    expect(
                    screen.getByText('Server is temporarily unavailable')
                    ).toBeInTheDocument();
                });
            });
            test('Handles 400 API responses', async () => {
                globalThis.fetch = vi.fn().mockResolvedValue({
                    ok: false,
                    status: 400,
                });

                render(<App />);

                await waitFor(() => {
                    expect(
                    screen.getByText('Bad request')
                    ).toBeInTheDocument();
                });
        })
    })
    })
})