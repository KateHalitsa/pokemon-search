import './ResultsSection.css';
import ResultTable from '../ResultsTable/ResultsTable';
import type { Item } from '../../App';
import Pagination from '../Pagination/Pagination';


export type Props = {
  results: Item[];
  loading: boolean;
  errorMessage: string;
  onErrorCheck: () => void;
};

function ResultsSection (props:Props) {
  
    const {results,loading,errorMessage} = props;

    return (
      <section className="results-section">
        <h2>Results</h2>
        {
        loading ? (
          <div className="loader" data-testid="loader" aria-label="Loading"> 
          </div>
        ) : (results.length === 0 ? (
          <p>{errorMessage}</p>
        ) : (
        <div>
          <ResultTable results={results} />
           <Pagination/>
        </div>
      ))
        }
       <div className='error-wapper'>
        <button className='error-btn' onClick={props.onErrorCheck}>Error</button>
       </div>
      </section>
    );
  
}

export default ResultsSection;