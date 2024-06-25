import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import MovieCard from "../components/MovieCard";
import api from "../services/api";

export default function WatchlistPage() {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await api.get(`/users/${user._id}/watchlist`);
        setWatchlist(response.data.watchlist);
      } catch (error) {
        console.log("Error fetching watchlist", error);
      }
    };
    if (user) {
      fetchWatchlist();
    }
  }, [user]);
  return (
    <div>
      <h1>My Watchlist</h1>
      {user && user.watchlist.length ? (
        user.watchlist.map((movie) => <MovieCard key={movie._id} {...movie} />)
      ) : (
        <p>No movies in watchlist</p>
      )}
    </div>
  );
}
