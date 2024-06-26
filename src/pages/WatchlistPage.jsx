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
      <p>
        <Link to="/signup">Sign up</Link> or <Link to="/login">login</Link> to
        add movies to your watchlist
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
      <div>
        <h1>Watchlist</h1>
        Your watchlist is empty
      </div>
    );
  }

  return (
    <div>
      <h1>Watchlist</h1>
      {watchlist.map((movie) => (
        <MovieCard key={movie._id} {...movie} />
      ))}
    </div>
  );
}
