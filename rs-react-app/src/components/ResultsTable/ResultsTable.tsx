import { Component } from "react";
import './ResultsTable.css';
import type { Item } from "../../App";

export type PropsTable = {
  results: Item[];

};
class ResultTable extends Component<PropsTable>{
    render(){
        const items = this.props.results;
   

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
}
export default ResultTable;