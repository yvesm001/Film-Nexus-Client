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
    <Link to={`/movies/${_id}`} >
    <div className="movieCard">
      <div className="card" style={{ width: "22rem", border: "none" }}>
        <img
          src={posterImg}
          className=" image card-img-top"
          alt="Movie Poster"
        />
        <div className="card-body" style={{ backgroundColor: "#41bc93" }}>
          <div className="middle">
            <p className="text">⭐{rating.toFixed(1)}</p>
            <p className="card-title">
              {title} ({releaseYear})
            </p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
