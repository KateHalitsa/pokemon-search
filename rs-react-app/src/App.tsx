
import './App.css'
import SearchSection, { SEARCH_STORAGE_KEY } from './components/SearchSection/SearchSection'
import ResultsSection from './components/ResultsSection/ResultsSection'
import { useEffect, useState } from 'react';
import { fetchPokemon } from './components/api/pokemonApi';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PaginationContext } from './context/PaginationContext';

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
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [crash, setCrash] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(
  totalCount / ITEMS_PER_PAGE
);
  const {
  storedValue: lastSearch,
  setValue: setLastSearch,
  } = useLocalStorage(
    ''
  );
  function causeAnError(){
    setCrash(
    true,
  );
  }
  useEffect(()=>{
    setLoading(true);
    
    fetchData(lastSearch,page);
  },[page,lastSearch])

  
 async function fetchData (search: string,  currentPage: number
) {
    let items: Item[];
    const offset = (currentPage - 1) * 10;
    try {

      let json;
      let response;
      if (search) {
        response = await fetchPokemon(search.toLowerCase());
      if (!response.ok) {
        
        setResults([]);
        setErrorMessage(getErrorMessage(response.status));
        setLoading(false);
      return;
        }
         const details: PokemonDetails =
        await response.json();
        
      const abilities = details.abilities.map(
        (a) => a.ability.name
      );

      items = [
        {
          name: details.name,
          description: 'Abilities: ' + abilities.join(', '),
        },
      ];
      setTotalCount(items.length);
      } else {
        response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
        );
       if (!response.ok) {
          
        setResults([]);
        setErrorMessage(getErrorMessage(response.status));
        setLoading(false);
      return;
        }
        json = await response.json();
        setTotalCount(json.count);
        
         items = await Promise.all(
          json.results.map(async (pokemon: Pokemon) => {
            const detailsResponse = await fetch(
              pokemon.url
            );

            const details: PokemonDetails =
              await detailsResponse.json();

            const abilities = details.abilities.map(
              (a) => a.ability.name
            );

            return {
              
              name: details.name,
              description:
                'Abilities: ' + abilities.join(', '),
            };
          })
      )
    }
      setResults(items)
      setLoading(false);
    } catch{
      setResults([]);
      setErrorMessage('Network connection error');
      setLoading(false);
    }
  };
  async function handleSearch(query: string){
    const trimmedValue = query.trim();
   if (trimmedValue === lastSearch) {
    return;
    }
   setErrorMessage('');
  setResults([]);
  setPage(1);
  setLastSearch(trimmedValue);
  };

  
    if (crash) {
    throw new Error('Test application error');
    }
    return (
      <>
        <SearchSection onSearch={handleSearch} />
        <PaginationContext.Provider
          value={{
            page,
            totalPages,
            setPage,
            setTotalCount
          }}
        >
        <ResultsSection results={results} loading={loading} errorMessage={errorMessage} onErrorCheck={causeAnError}/>
      </PaginationContext.Provider></>
    );
  }


export default App
