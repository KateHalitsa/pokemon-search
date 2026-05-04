import { Component } from 'react';
import './ResultsSection.css';
import ResultTable from '../ResultsTable/ResultsTable';
import type { Item, Pokemon, PokemonDetails } from '../../App';


export type Props = {
  results: Item[];
  loading: boolean;
  errorMessage: string;
};

class ResultsSection extends Component<Props> {
  render() {
    const {results,loading,errorMessage} = this.props;

    return (
      <section className="results-section">
        <h2>Results</h2>
        {
        loading ? (
          <div className="loader">
          </div>
        ) : (results.length === 0 ? (
          <p>{errorMessage}</p>
        ) : (
        <ResultTable results={results}/>))

  }
      </section>
    );
  }
}

export default ResultsSection;