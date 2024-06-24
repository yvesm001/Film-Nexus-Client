import React from "react";
import MovieList from "../components/MovieList";
import MovieCarousel from "../components/MovieCarousel";

export default function Homepage() {
  return (
    <div>
      <h1>Home Page</h1>
      <MovieCarousel />
      <MovieList />
    </div>
  );
}
