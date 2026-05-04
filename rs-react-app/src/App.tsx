
import './App.css'
import SearchSection, { SEARCH_STORAGE_KEY } from './components/SearchSection/SearchSection'
import ResultsSection from './components/ResultsSection/ResultsSection'
import { Component } from 'react';

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
  id: number;
  name: string;
  description: string;
};
type State = {
  lastSearch: string;
  results: Item[];
  loading: boolean;
  errorMessage:string;
  crash: boolean;
};
;
class App extends Component<{}, State> {
   state: State = {
    lastSearch:'',
    results: [],
    loading:false,
    errorMessage:'',
    crash:false
  };
  private loadTimeout?: number;
  causeAnError=()=>{
    this.setState({
    crash: true,
  });
  }
  componentDidMount() {
    this.fetchData(this.state.lastSearch);
  }
  getErrorMessage(status: number): string {
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
  fetchData = async (search: string) => {
    let items: Item[];
    try {
      let data;
      let json;
      let response;
      if (search) {
        response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
        );
      if (!response.ok) {
          this.setState({
        results: [],
        errorMessage: this.getErrorMessage(response.status),
        loading: false
      });

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
          id: 0
        },
      ];
      } else {
        response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
        );
       if (!response.ok) {
          this.setState({
        results: [],
        errorMessage: this.getErrorMessage(response.status),
        loading: false
      });
      return;
        }
        json = await response.json();
        data = json.results;

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
      this.setState({
        results: items,
        loading:false
      });
    } catch{
       this.setState({
      results: [],
      errorMessage: 'Network connection error',
      loading: false
    });
  
    }
  };
  handleSearch = (query: string) => {
    const trimmedValue = query.trim();
    if (trimmedValue === this.state.lastSearch) {
    return;
    }
    this.setState({
      lastSearch: trimmedValue,
    });

    this.state.loading = true;
      this.loadTimeout = window.setTimeout(() => {
      this.fetchData(trimmedValue);
      this.state.loading=false;
    }, 1500);
    localStorage.setItem(
        SEARCH_STORAGE_KEY,
        query
    );
  };

  render() {
    if (this.state.crash) {
    throw new Error('Test application error');
    }
    return (
      <>
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection results={this.state.results} loading={this.state.loading} errorMessage={this.state.errorMessage} onErrorCheck={this.causeAnError}/>
      </>
    );
  }
}

export default App
