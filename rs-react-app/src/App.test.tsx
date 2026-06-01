import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { test, expect, beforeEach, vi, describe, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import type { MockedFunction } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './components/api/pokemonApi';
import pokemonReducer from './store/pokemonSlice';

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

            render( 
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>);
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
            const store = makeStore();

            render(  
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>);
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
            const store = makeStore();

            render(
            <Provider store={store}>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </Provider>
            );
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
            const store = makeStore();

            render(<Provider store={store}>
                        <MemoryRouter>
                            <App />
                        </MemoryRouter>
                    </Provider>);

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

            const store = makeStore();

            render( <Provider store={store}>
                        <MemoryRouter>
                            <App />
                        </MemoryRouter>
                    </Provider>);

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
                const store = makeStore();

                render(
                <Provider store={store}>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </Provider>
                );
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
            
            const store = makeStore();

            render( <Provider store={store}>
                        <MemoryRouter>
                            <App />
                        </MemoryRouter>
                    </Provider>);
                await waitFor(() => {
                    expect(
                    screen.getByText('Bad request')
                    ).toBeInTheDocument();
                });
        })
    })
    })
    describe('State Management Tests',()=>{
        describe('Updates component state based on API responses',()=>{
            test('Updates component state based on successful API responses', async () => {
                globalThis.fetch = vi.fn()
                    .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({
                        count: 1,

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
                const store = makeStore();

                render(
                 <Provider store={store}>
                    <MemoryRouter>
                        <App />
                    </MemoryRouter>
                </Provider>
                );
                await waitFor(() => {
                expect(fetch).toHaveBeenCalled();
                });
                await waitFor(() => {
                    expect(screen.getByText('pikachu')).toBeInTheDocument();
                });

                expect(
                    screen.getByText('Abilities: static')
                ).toBeInTheDocument();

                expect(
                    screen.queryByTestId('loader')
                ).not.toBeInTheDocument();
            });
            test('Updates component state based on failed API responses', async () => {
                globalThis.fetch = vi.fn().mockResolvedValue({
                    ok: false,
                    status: 404,
                });

            render( <Provider store={store}>
                        <MemoryRouter>
                            <App />
                        </MemoryRouter>
                    </Provider>);

                const input =
                screen.getByPlaceholderText('Search...');

                await userEvent.type(
                input,
                'pikachu'
                );

                await userEvent.click(
                screen.getByRole('button', {
                    name: /search/i,
                })
                );
                await waitFor(() => {
                    expect(
                    screen.getByText('Nothing found for your search')
                    ).toBeInTheDocument();
                });

                expect(
                    screen.queryByTestId('loader')
                ).not.toBeInTheDocument();
            });
        })
        test('Manages search term state correctly', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      name: 'pikachu',
      abilities: [],
    }),
  });

  const user = userEvent.setup();

            render(  <Provider store={store}>
                        <MemoryRouter>
                            <App />
                        </MemoryRouter>
                    </Provider>);
  const input = screen.getByPlaceholderText('Search...');
  const button = screen.getByText('Search');

  await user.type(input, 'pikachu');
  await user.click(button);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });
});
    })
})
test('uses cached data for the same pokemon', async () => {
await store.dispatch(
  pokemonApi.endpoints.getPokemonByName.initiate('pikachu')
);

await store.dispatch(
  pokemonApi.endpoints.getPokemonByName.initiate('pikachu')
);

const state = store.getState().pokemonApi;

expect(
  state.queries['getPokemonByName("pikachu")']?.status
).toBe('fulfilled');
});