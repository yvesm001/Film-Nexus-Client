import React, { useContext } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const { movies } = useContext(MovieContext);
  return (
    <div>
      {movies ? (
        movies.map((movie) => <MovieCard {...movie} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
