
import './App.css'
import SearchSection from './components/SearchSection/SearchSection'
import ResultsSection from './components/ResultsSection/ResultsSection'
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PaginationContext } from './context/PaginationContext';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { setCrash, setErrorMessage, setLoading, setResults, setTotalCount } from './store/pokemonSlice';
import SelectedItemsFlyout from './components/SelectedItemsFlyout/SelectedItemsFlyout';
import { useGetPokemonByNameQuery, useGetPokemonListQuery } from './components/api/pokemonApi';

export type Pokemon = {
  name: string;
  url: string;
};
export type PokemonDetails = {
  name: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
};

export type Item = {
  name: string;
  description: string;
};

  export function getErrorMessage(status: number): string {
  if (status === 404) {
    return 'Nothing found for your search';
  }

  if (status >= 500) {
    return 'Server is temporarily unavailable';
  }

  if (status >= 400) {
    return 'Bad request';
  }

  return 'Unexpected error';
}

function App() {
  const dispatch =
  useDispatch<AppDispatch>();
  const {
  storedValue: lastSearch,
  setValue: setLastSearch,
  } = useLocalStorage(
    ''
  );
  const {
    currentPage,
    crash,
  } = useSelector(
    (state: RootState) =>
      state.pokemon
  );
  const searchQuery = useGetPokemonByNameQuery(
  lastSearch.toLowerCase(),
  {
    skip: !lastSearch,
  }
);

const listQuery = useGetPokemonListQuery(
  currentPage,
  {
    skip: !!lastSearch,
  }
);
  const queryResult = lastSearch
  ? searchQuery
  : listQuery;
  
  const {
    data,
    isLoading,
    error,
  } = queryResult;


  const items: Item[] = lastSearch
  ? (data as Item[]) ?? []
  : (data as {
      items: Item[];
      count: number;
    })?.items ?? [];
  const totalCount = lastSearch
  ? items.length
  : (data as {
      items: Item[];
      count: number;
    })?.count ?? 0;
  const ITEMS_PER_PAGE = 10;

  const [searchParams, setSearchParams] =
  useSearchParams();

const rawPage = Number(
  searchParams.get('page')
) || 1;



  const totalPages = Math.ceil(
  totalCount / ITEMS_PER_PAGE
);
const page = Math.min(
  Math.max(rawPage, 1),
  totalPages || 1
);
  
  function causeAnError(){
    dispatch(setCrash(true));
  }
  function handlePageChange(
  newPage: number
) {
  
  setSearchParams({
    page: String(newPage),
  });
}
useEffect(() => {
  if (rawPage > totalPages && totalPages > 0) {
    setSearchParams({
      page: String(totalPages),
    });

    return;
  }

  dispatch(setLoading(true));

}, [page, lastSearch]);
useEffect(() => {
    if (
      rawPage > totalPages &&
      totalPages > 0
    ) {
      setSearchParams({
        page: String(totalPages),
      });
    }
  }, [rawPage, totalPages]);  

  async function handleSearch(query: string){
    const trimmedValue = query.trim();
   if (trimmedValue === lastSearch) {
    return;
    }
   dispatch(setErrorMessage(''));
  dispatch(setResults([]));
  setSearchParams({
    page: '1',
  });
  setLastSearch(trimmedValue);
  };

  
    if (crash) {
    throw new Error('Test application error');
    }
    let errorMessage = '';

if (error && 'status' in error) {
  if (typeof error.status === 'number') {
    errorMessage = getErrorMessage(
      error.status
    );
  } else {
    errorMessage =
      'Network connection error';
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
                setPage:handlePageChange,
                setTotalCount
              }}
            >
            <ResultsSection results={items} loading={isLoading} errorMessage={errorMessage} onErrorCheck={causeAnError}/>  
            </PaginationContext.Provider>
          </div>
          <div className="right-panel">
            <Outlet />
          </div>
          </div>
    );
  }


export default App




