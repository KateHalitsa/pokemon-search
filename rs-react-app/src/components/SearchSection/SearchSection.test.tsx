import { render, screen, waitFor  } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchSection, { SEARCH_STORAGE_KEY } from "./SearchSection";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
  localStorage.setItem(SEARCH_STORAGE_KEY , 'react testing');

});

afterEach(() => {
  cleanup();
    vi.unstubAllGlobals();

});
describe('SearchSection', () => {
    describe('Rendering Tests',()=>{
        test('Renders search input and search button', () => {
        const searchFn=vi.fn();

        render(<SearchSection onSearch={searchFn}/>);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        });

        test('Displays previously saved search term from localStorage on mount', async () => {
        const searchFn=vi.fn();

        render(<SearchSection onSearch={searchFn}/>);

        await waitFor(() => {
            expect(screen.getByRole('textbox')).toHaveValue('react testing');
        });
        });
        test('Shows empty input when no saved term exists', async () => {
        const searchFn=vi.fn();
        localStorage.clear();

        render(<SearchSection onSearch={searchFn}/>);

        await waitFor(() => {
            expect(screen.getByRole('textbox')).toHaveValue('');
        });
        });
    })
    describe("User Interaction Tests", () => {
        test('Updates input value when user types',async()=>{
            const user = userEvent.setup();
            const searchFn = vi.fn();
            render(<SearchSection onSearch={searchFn}/>);

            const input=screen.getByPlaceholderText("Search...");
            await user.clear(input);
            await user.type(input, "Test");
            expect(input).toHaveValue('Test');
        })
        test('Saves search term to localStorage when search button is clicked', async()=>{
            const user = userEvent.setup();
            const searchFn = vi.fn();
            render(<SearchSection onSearch={searchFn}/>);

            const button = screen.getByRole('button');
            const input=screen.getByPlaceholderText("Search...");
            await user.clear(input);
            await user.type(input, 'Pikachu');
            await user.click(button);

            expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('Pikachu');

        })

        test('Trims whitespace from search input before saving', async()=>{
            const user = userEvent.setup();
            const searchFn = vi.fn();
            render(<SearchSection onSearch={searchFn}/>);

            const button = screen.getByRole('button');
            const input=screen.getByPlaceholderText("Search...");
            await user.clear(input);
            await user.type(input, '   Pikachu ');
            await user.click(button);

            expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('Pikachu');

        })
        test('Triggers search callback with correct parameters', async()=>{
            const user = userEvent.setup();
            const searchFn = vi.fn();
            render(<SearchSection onSearch={searchFn}/>);

            const button = screen.getByRole('button');
            const input=screen.getByPlaceholderText("Search...");
            await user.clear(input);
            await user.type(input, 'Pikachu');
            await user.click(button);

            expect(searchFn).toHaveBeenCalledWith('Pikachu');
 
        })

    })
    describe('LocalStorage Integration',()=>{
        test('Retrieves saved search term on component mount', async () => {
        localStorage.setItem(SEARCH_STORAGE_KEY, 'Bulbasaur');

        render(<SearchSection onSearch={vi.fn()} />);

        expect(await screen.findByDisplayValue('Bulbasaur')).toBeInTheDocument();
    });
        test('Overwrites existing localStorage value when new search is performed',async()=>{
        localStorage.setItem(SEARCH_STORAGE_KEY, 'react');

        const user = userEvent.setup();

        render(<SearchSection onSearch={vi.fn()} />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        await user.clear(input);
        await user.type(input, 'pikachu');
        await user.click(button);

        expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('pikachu');
        })
    })

})