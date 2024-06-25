import React, { useEffect, useContext } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "../components/MovieCard";

export default function WatchlistPage() {
  const { watchlist, getWatchlist } = useContext(MovieContext);

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
