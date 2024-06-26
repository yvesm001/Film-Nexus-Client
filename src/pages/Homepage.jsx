import React from "react";
import MovieList from "../components/MovieList";


import MovieCarousel from "../components/MovieCarousel";


export default function Homepage() {
  return (
    <div className="homePage">
      <MovieCarousel />


      <MovieList />
    </div>
  );
}
