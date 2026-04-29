import { Component } from 'react';
import './ResultsSection.css';
import ResultTable from '../ResultsTable/ResultsTable';

class ResultsSection extends Component {
  render() {
    return (
      <section className="results-section">
        <h2>Results</h2>
        <ResultTable/>
      </section>
    );
  }
}

export default ResultsSection;