import {
  FaSearch,
  FaTimes,
} from "react-icons/fa";

function SearchBar({
  search,
  setSearch,
  handleSearch,
  clearSearch,
}) {
  return (
    <form
      className="search-form"
      onSubmit={handleSearch}
    >
      <FaSearch className="search-icon" />

      <input
        type="search"
        placeholder="Search headphones, watches, shoes..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        aria-label="Search products"
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <FaTimes />
        </button>
      )}

      <button
        className="search-button"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;