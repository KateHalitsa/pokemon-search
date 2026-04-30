
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
  lastSearch: string;
  results: Item[];
};
;
class App extends Component<{}, State> {
   state: State = {
    lastSearch:'',
    results: [],
  };

  componentDidMount(): void {
    this.fetchData(this.state.lastSearch);
  }

  fetchData = async (search: string) => {
    let items: Item[];
    try {
      let data;
      let json;
      if (search) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
        );

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
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'
        );

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
      });
    } catch {
      this.setState({
        results: [],
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

    this.fetchData(trimmedValue);
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
