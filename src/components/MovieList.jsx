import React, { useContext } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const { movies } = useContext(MovieContext);
  return (
    <div className="search-page">
      <div className="movieList">
        {movies ? (
          movies.map((movie) => <MovieCard key={movie._id} {...movie} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
