// src/components/SearchPage.jsx
import React, { useContext, useState } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const { searchMovies, searchResults } = useContext(MovieContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchQuery);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h2>Search</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-success search-button"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="search-results">
        {searchResults ? (
          searchResults.map((movie) => <MovieCard key={movie._id} {...movie} />)
        ) : (
          <div>No search results</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
