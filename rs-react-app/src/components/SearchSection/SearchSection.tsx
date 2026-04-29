import { Component, type ReactNode } from "react";
import './SearchSection.css';
class SearchSection extends Component{
    render(): ReactNode {
        return(
            <section className="search-section">
                <div className="search-wapper">
                    <input className="search-input"
                    type="text"
                    placeholder="Search...">
                    </input>
                    <button className="search-btn">
                        Search
                    </button>
                </div>
            </section>
        )
    }
}
export default SearchSection