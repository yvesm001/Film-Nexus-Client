import React, { useContext } from "react";
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
    <div className="movieCard">
      <div className="card" style={{ width: "18rem" }}>
        <img src={posterImg} className="card-img-top" alt="Movie Poster" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Release Year: {releaseYear}</p>
          <p>Synopsis: {description}</p>

          <Link to={`/movies/${_id}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
