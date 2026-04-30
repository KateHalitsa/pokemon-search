import { Component } from 'react';
import './ResultsSection.css';
import ResultTable from '../ResultsTable/ResultsTable';
import type { Item, Pokemon, PokemonDetails } from '../../App';


export type Props = {
  results: Item[];
};

class ResultsSection extends Component<Props> {
  render() {
    const { results} = this.props;

    return (
      <section className="results-section">
        <h2>Results</h2>
        {results.length === 0 ? (
          <p>No results</p>
        ) : (
        <ResultTable results={results}/>)}
      </section>
    );
  }
}

export default ResultsSection;