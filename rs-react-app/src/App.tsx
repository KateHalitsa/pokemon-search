
import './App.css'
import SearchSection from './components/SearchSection/SearchSection'
import ResultsSection from './components/ResultsSection/ResultsSection'
import { Component } from 'react';

export type Item = {
  id: number;
  name: string;
  description: string;
};
type State = {
  results: Item[];
};
class App extends Component<{}, State> {
   state: State = {
    results: [],
  };

  handleSearch = (query: string) => {
    const results = [
      {
        id: 1,
        name: query,
        description: 'Description 1',
      },
      {
        id: 2,
        name: `${query} 2`,
        description: 'Description 2',
      },
    ];

    this.setState({
      results,
    });
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
