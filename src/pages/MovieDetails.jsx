import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../components/MovieDetailsCard";
import { AuthContext } from "../context/auth.context";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

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
      <ReviewForm />
      { movie && movie.reviews.length ? (movie.reviews.map((review) => <ReviewCard review={review} />)
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
}
