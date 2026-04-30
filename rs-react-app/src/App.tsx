
import './App.css'
import SearchSection from './components/SearchSection/SearchSection'
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
  search: string;
  results: Item[];
  loading: boolean;
};
;
class App extends Component<{}, State> {
   state: State = {
    search:'',
    results: [],
    loading: false,
  };

  componentDidMount(): void {
    this.fetchData(this.state.search);
  }

  fetchData = async (search: string) => {
    this.setState({ loading: true });
    let items: Item[];
    try {
      let data;

      if (search) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
        );

        const pokemon = await response.json();

        data = [
          {
            name: pokemon.name,
            url: '',
          },
        ];
      } else {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
        );

        const json = await response.json();
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
        loading: false,
      });
    } catch {
      this.setState({
        results: [],
        loading: false,
      });
    }
  };
  handleSearch = (query: string) => {
    this.setState({
      search: query,
    });

    this.fetchData(query);
  };

  render() {
    return (
      <>
        <SearchSection onSearch={this.handleSearch} />
        <ResultsSection results={this.state.results} />
      </>
    );
  }
}

export default App
