import { Component, type ReactNode } from "react";
import './SearchSection.css';
const SEARCH_STORAGE_KEY = "rssSearch";
type State = {
  lastSearch: string;
};
type Props = {
  onSearch: (value: string) => void;
};
class SearchSection extends Component<Props, State>{
    constructor(props: Props) {
    super(props);
    this.state = {lastSearch: localStorage.getItem(SEARCH_STORAGE_KEY)|| '',};
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({
        lastSearch: value,
    });

    localStorage.setItem(
        SEARCH_STORAGE_KEY,
        value
    );
    };
    handleSearch = () => {
    this.props.onSearch(this.state.lastSearch);
    };
        
    render(): ReactNode {
        return(
            <section className="search-section">
                <div className="search-wapper">
                    <input className="search-input"
                    type="text"
                    placeholder="Search..."
                    value = {this.state.lastSearch}
                    onChange={this.handleChange}>
                    </input>
                    <button className="search-btn"
                    onClick={this.handleSearch}>
                        Search
                    </button>
                </div>
            </section>
        )
    }
}
export default SearchSection