import './ResultsTable.css';
import type { Item } from "../../App";
import { Link } from "react-router-dom";
import { usePagination } from "../../context/PaginationContext";

export type PropsTable = {
  results: Item[];

};
function ResultTable (props:PropsTable){

    const items = props.results;
   const { page } = usePagination();
    return (
         <div className="results-table">
        <div className="table-header">
          <div>Name</div>
          <div>Description</div>
        </div>
        {items.map((item)=>(
        <div className="table-row" key={item.name}>
            <div>
            <Link
              to={`pokemon/${item.name}?page=${page}`}
            >
              {item.name}
            </Link>
          </div>
            <div>{item.description}</div>
          </div>
        ))}
        </div>
    );
} 

export default ResultTable;