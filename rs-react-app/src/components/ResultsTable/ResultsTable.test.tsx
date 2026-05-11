import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ResultTable from "../ResultsTable/ResultsTable";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

describe('Card/Item Component Tests', () => {
  afterEach(() => {
    cleanup();
  });
  describe('Rendering Tests', () => {
    test('Displays item name and description correctly', () => {
        render(
            <ResultTable
            results={[
                {
                id: 1,
                name: 'Pikachu',
                description: 'Abilities: static',
                },
            ]}
            />
        );

        expect(screen.getByText('Pikachu')).toBeInTheDocument();

        expect(
            screen.getByText('Abilities: static')
        ).toBeInTheDocument();
        }); 
        test('Handles missing props gracefully', () => {
            render(<ResultTable results={[]} />);

            expect(screen.queryByText('Pikachu'))
                .not.toBeInTheDocument();
        });
  })
})