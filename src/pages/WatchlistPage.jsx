import React, { useEffect, useContext } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function WatchlistPage() {
  const { watchlist, getWatchlist } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        await getWatchlist();
      } catch (error) {
        console.log("Error fetching watchlist", error);
      }
    };
    fetchWatchlist();
  }, []);

  //MESSAGE USER SEES IF THEY ARE NOT LOGGED IN
  if (!user) {
    return (
      <p>
        <Link to="/signup">Sign up</Link> or <Link to="/login">login</Link> to
        add movies to your watchlist
      </p>
    );
  }

  return (
    <div>
      <h1>My Watchlist</h1>
      {watchlist ? (
        watchlist.map((movie) => <MovieCard key={movie._id} {...movie} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
