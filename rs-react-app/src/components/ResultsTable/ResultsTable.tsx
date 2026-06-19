import './ResultsTable.css';
import type { Item } from "../../App";
import { usePagination } from "../../context/PaginationContext";
import { toggleSelectedItem } from '../../store/pokemonSlice';

import {
  useAppDispatch,
  useAppSelector,
} from '../../store/hooks';
import Link from 'next/link';

export type PropsTable = {
  results: Item[];

};
function ResultTable (props:PropsTable){

  const items = props.results;
  const { page } = usePagination();
  const dispatch  = useAppDispatch();
  const selectedItems = useAppSelector(
      (state) =>
        state.pokemon.selectedItems
    );
    return (
         <div className="results-table">
        <div className="table-header">
          <div>Name</div>
          <div>Description</div>
        </div>
        {items.map((item)=>(
        <div  className={`table-row ${
          selectedItems.includes(item)
            ? 'selected'
            : ''
        }`} key={item.name}>
            <div>
              <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() =>
                dispatch(
                  toggleSelectedItem(item)
                )
              }
              onClick={(e) => e.stopPropagation()}
            />
            <Link
              href={`pokemon/${item.name}?page=${page}`}
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

