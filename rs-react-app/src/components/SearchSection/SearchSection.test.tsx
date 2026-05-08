import { render, screen, waitFor  } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchSection, { SEARCH_STORAGE_KEY } from "./SearchSection";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';


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
})