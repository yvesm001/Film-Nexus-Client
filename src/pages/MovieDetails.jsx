import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../components/MovieDetailsCard";
import { AuthContext } from "../context/auth.context";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import TrailerPlayer from "../components/TrailerPlayer";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { movies } = useContext(MovieContext);
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    movies && setMovie(movies.find((curr) => curr._id === movieId));
  }, [movies, movieId]);

  return (
    <div className="details-container">
      {movie ? <MovieDetailsCard movie={movie} /> : <p>Loading...</p>}
      {movie && movie.trailerUrl && <TrailerPlayer movie={movie} />}
      <div className="review-elements">
      <div className="review-container">
        <h1
          style={{
            display: "inline-block",
            borderBottom: "7px solid red",
            color: "#fff",
          }}
        >
          Reviews
        </h1>
        {movie && movie.reviews.length ? (
          movie.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} user={user} />
          ))
        ) : (
          <p>No reviews yet</p>
        )}
        <ReviewForm />
      </div>
      </div>
    </div>
  );
}
