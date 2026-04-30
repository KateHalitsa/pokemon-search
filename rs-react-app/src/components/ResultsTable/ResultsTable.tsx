import { Component } from "react";
import './ResultsTable.css';
import type { Props } from "../ResultsSection/ResultsSection";

class ResultTable extends Component<Props>{
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