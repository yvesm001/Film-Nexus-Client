import React, { useEffect, useContext } from "react";
import { MovieContext } from "../context/movie.context";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites, getFavorites } = useContext(MovieContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        await getFavorites();
      } catch (error) {
        console.log("Error fetching favorites", error);
      }
    };
    fetchFavorites();
  }, []);

  //MESSAGE USER SEES IF THEY ARE NOT LOGGED IN
  if (!user) {
    return (
      <p>
        <Link to="/signup">Sign up</Link> or <Link to="/login">login</Link> to
        add movies to your favorites
      </p>
    );
  }

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites ? (
        favorites.map((movie) => <MovieCard key={movie._id} {...movie} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
