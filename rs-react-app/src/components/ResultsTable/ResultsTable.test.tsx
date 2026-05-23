import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ResultTable from "../ResultsTable/ResultsTable";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { MemoryRouter } from "react-router-dom";
import { PaginationContext } from "../../context/PaginationContext";

describe('Card/Item Component Tests', () => {
  afterEach(() => {
    cleanup();
  });
  describe('Rendering Tests', () => {
    test('Displays item name and description correctly', () => {
render(
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
);
        expect(screen.getByText('Pikachu')).toBeInTheDocument();

        expect(
            screen.getByText('Abilities: static')
        ).toBeInTheDocument();
        }); 
        test('Handles missing props gracefully', () => {
render(
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
);
            expect(screen.queryByText('Pikachu'))
                .not.toBeInTheDocument();
        });
  })
})