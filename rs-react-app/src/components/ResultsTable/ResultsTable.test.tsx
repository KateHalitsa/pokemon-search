import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ResultTable from "../ResultsTable/ResultsTable";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { MemoryRouter } from "react-router-dom";
import { PaginationContext } from "../../context/PaginationContext";
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Card/Item Component Tests', () => {
  afterEach(() => {
    cleanup();
  });
  describe('Rendering Tests', () => {
    test('Displays item name and description correctly', () => {
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
      <ResultTable results={[
                {
                name: 'Pikachu',
                description: 'Abilities: static',
                },
            ]} />
    </PaginationContext.Provider>
  </MemoryRouter>
  </Provider>
);
        expect(screen.getByText('Pikachu')).toBeInTheDocument();

        expect(
            screen.getByText('Abilities: static')
        ).toBeInTheDocument();
        }); 
        test('Handles missing props gracefully', () => {
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
      <ResultTable results={[]} />
    </PaginationContext.Provider>
  </MemoryRouter>
  </Provider>

);
            expect(screen.queryByText('Pikachu'))
                .not.toBeInTheDocument();
        });
  })
})