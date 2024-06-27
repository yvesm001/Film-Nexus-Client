import React, { useEffect, useContext, useState } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { watchlist, getWatchlist } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        await getWatchlist();
      } catch (error) {
        console.log("Error fetching watchlist", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  // MESSAGE USER SEES IF THEY ARE NOT LOGGED IN
  if (!user) {
    return (
      <p className="auth-message">
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
        or
        <Link to="/login" className="auth-link">
          login
        </Link>
        to add movies to your watchlist
      </p>
    );
  }

  // MESSAGE USER SEES WHILE FAVORITES ARE BEING FETCHED
  if (loading) {
    return <div>Loading...</div>;
  }

  // MESSAGE USER SEES IF THEY HAVE NO FAVORITES
  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="favorites-container">
        <h1>Watchlist</h1>
        <p>Your watchlist is empty</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Watchlist</h1>
      <div className="favorites-list">
        {watchlist.map((movie) => (
          <MovieCard key={movie._id} {...movie} />
        ))}
      </div>
    </div>
  );
}
