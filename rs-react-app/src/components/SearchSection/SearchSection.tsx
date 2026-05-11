import { Component, type ReactNode } from "react";
import './SearchSection.css';
 export const SEARCH_STORAGE_KEY = "rssSearch";
type State = {
  lastSearch: string;
};
type Props = {
  onSearch: (value: string) => void;
};
class SearchSection extends Component<Props, State>{
    constructor(props: Props) {
    super(props);
    this.state = {lastSearch: '',};
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    this.setState({
        lastSearch: value,
    });

    localStorage.setItem(
        SEARCH_STORAGE_KEY,
        value.trim()
    );
    };
    handleSearch = () => {
    this.props.onSearch(this.state.lastSearch);
    };
    componentDidMount() {
    const saved = localStorage.getItem(SEARCH_STORAGE_KEY);

    if (saved) {
      this.setState({
        lastSearch: saved,
      });
    }
    }
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