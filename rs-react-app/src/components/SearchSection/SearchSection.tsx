import React from "react";
import './SearchSection.css';
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const SEARCH_STORAGE_KEY = "rssSearch";

type Props = {
  onSearch: (value: string) => void;
};

function SearchSection(props: Props) {
  const {
    storedValue: lastSearch,
    setValue: setLastSearch,
  } = useLocalStorage(
    ''
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setLastSearch(e.target.value);
  }

  function handleSearch() {
    props.onSearch(lastSearch);
  }

  return (
    <section className="search-section">
      <div className="search-wapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={lastSearch}
          onChange={handleChange}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </section>
  );
}

export default SearchSection;