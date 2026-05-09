import { render, screen, waitFor  } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import ResultTable from "../ResultsTable/ResultsTable";
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsSection from "./ResultsSection";

afterEach(() => {
  cleanup();
});

describe('Results/CardList Component Tests', () => {
    
    describe('Rendering Tests',()=>{
        test('Renders correct number of items when data is provided', async()=>{
        const items = [
            { id: 1, name: 'Pikachu', description: 'Abilities: static, lightning-rod' },
            { id: 2, name: 'Bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
            { id: 3, name: 'Charmander', description: 'Abilities: blaze, solar-power' },
        ];  

        render(
            <ResultTable
            results={items}
            />
        );

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
        })
        test('Renders correct number of items when data is provided', async()=>{
        const items = [];  
        const onErrorCheck= vi.fn();
        render(
            <ResultsSection
            results={items}
            loading = {false}
            errorMessage="Nothing found for your search"
            onErrorCheck ={onErrorCheck}
            />
        );

        expect(screen.getByText('Nothing found for your search')).toBeInTheDocument();
    })
    test('Shows loading state while fetching data', async() => {
  render(
    <ResultsSection
      results={[]}
      loading={true}
      errorMessage=""
      onErrorCheck={() => {}}
    />
  );

  expect(await screen.findByTestId('loader')).toBeInTheDocument();
});
    })
    describe('Data Display Tests',()=>{
      test('Data Display Tests',()=>{
        const items = [
            { id: 1, name: 'Pikachu', description: 'Abilities: static, lightning-rod' },
            { id: 2, name: 'Bulbasaur', description: 'Abilities: overgrow, chlorophyll' },
            { id: 3, name: 'Charmander', description: 'Abilities: blaze, solar-power' },
        ];

          render(
            <ResultTable
            results={items}
            />
        );

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Abilities: static, lightning-rod')).toBeInTheDocument();

        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('Abilities: overgrow, chlorophyll')).toBeInTheDocument();

        expect(screen.getByText('Charmander')).toBeInTheDocument();
        expect(screen.getByText('Abilities: blaze, solar-power')).toBeInTheDocument();

      })

test('Handles empty data gracefully', () => {
  render(<ResultTable results={[]} />);

  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();

  expect(screen.queryByText(/Abilities/i)).not.toBeInTheDocument();
});
    })
})