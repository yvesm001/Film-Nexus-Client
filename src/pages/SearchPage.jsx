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
    <div>
      <h1>Search Results</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults
          ? searchResults.map((movie) => (
              <MovieCard key={movie._id} {...movie} />
            ))
          : "No search results"}
      </div>
    </div>
  );
};

export default SearchPage;
