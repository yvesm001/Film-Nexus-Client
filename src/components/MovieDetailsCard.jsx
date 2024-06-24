import React from "react";
import { useContext, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { AuthContext } from "../context/auth.context";

export default function MovieDetailsCard({ movie }) {
  const { deleteMovie } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  return (
    <div>
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <h2>{movie.releaseYear}</h2>
          <h3>{movie.description}</h3>
        </>
      ) : (
        <h1>no movie</h1>
      )}
    </div>
  );
}
