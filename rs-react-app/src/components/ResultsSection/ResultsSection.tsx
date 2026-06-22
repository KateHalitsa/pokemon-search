import './ResultsSection.css';
import ResultTable from '../ResultsTable/ResultsTable';
import type { Item } from '../../App';
import Pagination from '../Pagination/Pagination';
import { useTranslations } from 'next-intl';


export type Props = {
  results: Item[];
  loading: boolean;
  fetching: boolean;
  errorMessage: string;
  onErrorCheck: () => void;
};

function ResultsSection (props:Props) {
  
    const {results,loading,fetching,errorMessage} = props;
   const t = useTranslations("Results");
    
    return (
      <section className="results-section">
        <h2>{t("title")}</h2>
        {
        loading||fetching ? (
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
        <button className='error-btn' onClick={props.onErrorCheck}>{t("error")}</button>
       </div>
      </section>
    );
  
}

export default ResultsSection;