import { Component } from "react";
import './ResultsTable.css';
import type { Item } from "../../App";

export type PropsTable = {
  results: Item[];

};
function ResultTable (props:PropsTable){

    const items = props.results;
   
    return (
         <div className="results-table">
        <div className="table-header">
          <div>Name</div>
          <div>Description</div>
        </div>
        {items.map((item)=>(
        <div className="table-row" key={item.name}>
            <div>{item.name}</div>
            <div>{item.description}</div>
          </div>
        ))}
        </div>
    );
} 

export default ResultTable;