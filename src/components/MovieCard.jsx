import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({
  _id,
  title,
  description,
  releaseYear,
  genre,
  cast,
  posterImg,
  backdropImg,
  rating,
  trailerUrl,
  popularity,
}) {
  return (
    <div>
      <Link to={`/movies/${_id}`}>
        <h1>{title}</h1>
      </Link>
      <img src={posterImg} />
      <p>{releaseYear}</p>
    </div>
  );
}
