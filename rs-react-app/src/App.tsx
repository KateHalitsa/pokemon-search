
import './App.css'
import SearchSection, { SEARCH_STORAGE_KEY } from './components/SearchSection/SearchSection'
import ResultsSection from './components/ResultsSection/ResultsSection'
import { useEffect, useState } from 'react';
import { fetchPokemon } from './components/api/pokemonApi';
import { useLocalStorage } from './hooks/useLocalStorage';

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
    
    fetchData(lastSearch);
  },[])

  
 async function fetchData (search: string) {
    let items: Item[];
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
      } else {
        response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
        );
       if (!response.ok) {
          
        setResults([]);
        setErrorMessage(getErrorMessage(response.status));
        setLoading(false);
      return;
        }
        json = await response.json();

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
    
      setLastSearch(trimmedValue);
      setLoading(true);
      setErrorMessage('');
      setResults([]);
    


    await fetchData(trimmedValue);

    setLoading(false);
  };

  
    if (crash) {
    throw new Error('Test application error');
    }
    return (
      <>
        <SearchSection onSearch={handleSearch} />
        <ResultsSection results={results} loading={loading} errorMessage={errorMessage} onErrorCheck={causeAnError}/>
      </>
    );
  }


export default App
