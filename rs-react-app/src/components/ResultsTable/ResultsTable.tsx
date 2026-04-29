import { Component } from "react";
import './ResultsTable.css';

class ResultTable extends Component{
    render(){
        const items =[
            { name: 'Item 1', description: 'Description 1' },
            { name: 'Item 2', description: 'Description 2' },
            { name: 'Item 3', description: 'Description 3' },
        ]
   
    return (
         <div className="results-table">
        <div className="table-header">
          <div>Item Name</div>
          <div>Item Description</div>
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