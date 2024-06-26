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
      <div className="card" style={{ width: "22rem", border: "5px solid red" }}>
        <img
          src={posterImg}
          className=" imgage card-img-top"
          alt="Movie Poster"
        />
        <div className="card-body" style={{ backgroundColor: "#41bc93" }}>
          <div className="middle">
            <Link to={`/movies/${_id}`} className="detailsBtn btn btn-danger">
              ▶️
            </Link>
            <p className="text">⭐{Math.round(rating)}</p>
            <p className="card-title">
              {title} ({releaseYear})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
