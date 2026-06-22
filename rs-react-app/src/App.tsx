"use client"; 

import './App.css';
import SearchSection from './components/SearchSection/SearchSection';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PaginationContext } from './context/PaginationContext';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { setCrash, setErrorMessage, setLoading, setResults, setTotalCount } from './store/pokemonSlice';
import SelectedItemsFlyout from './components/SelectedItemsFlyout/SelectedItemsFlyout';
import { useGetPokemonByNameQuery, useGetPokemonListQuery } from './components/api/pokemonApi';
import RefreshButton from './components/RefreshButton/RefreshButton';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export type Pokemon = { name: string; url: string; };
export type PokemonDetails = { name: string; abilities: { ability: { name: string; }; }[]; };
export type Item = { name: string; description: string; };

export function getErrorMessage(status: number): string {
  if (status === 404) return 'Nothing found for your search';
  if (status >= 500) return 'Server is temporarily unavailable';
  if (status >= 400) return 'Bad request';
  return 'Unexpected error';
}

export default function App({ children }: { children?: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();     
  const pathname = usePathname();

  const { storedValue: lastSearch, setValue: setLastSearch } = useLocalStorage('');
  const { crash } = useSelector((state: RootState) => state.pokemon);

  const searchParams = useSearchParams();

  const rawPage = Number(searchParams?.get('page')) || 1;
  const page = Math.max(rawPage, 1);

  const searchQuery = useGetPokemonByNameQuery(lastSearch.toLowerCase(), { skip: !lastSearch });
  const listQuery = useGetPokemonListQuery(page, { skip: !!lastSearch });
  const queryResult = lastSearch ? searchQuery : listQuery;
  const { data, isLoading, isFetching, error } = queryResult;

  const items: Item[] = lastSearch
    ? (data as Item[]) ?? []
    : (data as { items: Item[]; count: number; })?.items ?? [];

  const totalPages = Math.ceil((lastSearch
    ? items.length
    : (data as { items: Item[]; count: number; })?.count ?? 0) / 10);
  
  function causeAnError() {
    dispatch(setCrash(true));
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    if (rawPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('page', String(totalPages));
      router.push(`${pathname}?${params.toString()}`);
      return;
    }
    dispatch(setLoading(true));
  }, [page, lastSearch, totalPages, rawPage, pathname, router, searchParams, dispatch]);

  useEffect(() => {
    if (rawPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set('page', String(totalPages));
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [rawPage, totalPages, pathname, router, searchParams]);  

  async function handleSearch(query: string) {
    const trimmedValue = query.trim();
    if (trimmedValue === lastSearch) return;
    
    dispatch(setErrorMessage(''));
    dispatch(setResults([]));
    
    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
    
    setLastSearch(trimmedValue);
  }

  if (crash) {
    throw new Error('Test application error');
  }
  
  let errorMessage = '';
  if (error && 'status' in error) {
    if (typeof error.status === 'number') {
      errorMessage = getErrorMessage(error.status);
    } else {
      errorMessage = 'Network connection error';
    }
  }

  return (
    <div className="layout">
      <SelectedItemsFlyout />
      <div className="left-panel">
        <SearchSection onSearch={handleSearch} />
        <PaginationContext.Provider
          value={{
            page,
            totalPages,
            setPage: handlePageChange,
            setTotalCount
          }}
        >
          <ResultsSection results={items} loading={isLoading} fetching={isFetching} errorMessage={errorMessage} onErrorCheck={causeAnError}/>  
          <RefreshButton/>
        </PaginationContext.Provider>
      </div>
      <div className="right-panel">
        {children}
      </div>
    </div>
  );
}
