import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../components/MovieDetailsCard";
import { AuthContext } from "../context/auth.context";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { movies } = useContext(MovieContext);
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    movies && setMovie(movies.find((curr) => curr._id === movieId));
  }, [movies, movieId]);

  return (
    <div>
      <h1>Movie Details</h1>
      {movie ? <MovieDetailsCard movie={movie} /> : <p>Loading...</p>}
    </div>
  );
}
import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { movies } = useContext(MovieContext);
  const { movieId } = useParams();

  useEffect(() => {
    movies && setMovie(movies.find((curr) => curr._id === movieId));
  }, [movies, movieId]);
  return (
    <div>
      <h1>Details Page</h1>
      {movie ? (
        <div className="movieCard">
          {/* <img
            src={movie.backdropImg}
            className="card-img-top"
            alt="Movie Poster"
          /> */}
          <div className="card" style={{ width: "30rem" }}>
            <img
              src={movie.posterImg}
              className="card-img-top"
              alt="Movie Poster"
            />
            <div className="card-body">
              <h1>{movie.title}</h1>
              <h2 className="card-text">Relese Year: {movie.releaseYear}</h2>
              <h3>Sinopsis: {movie.description}</h3>
            </div>
          </div>
        </div>
      ) : (
        <h1>no movie</h1>
      )}
      <hr />
      <ReviewCard />
    </div>
  );
}
