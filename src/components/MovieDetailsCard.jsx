import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/movie.context";
import { AuthContext } from "../context/auth.context";
import EditForm from "./EditForm";

export default function MovieDetailsCard({ movie }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const {
    deleteMovie,
    addToWatchlist,
    removeFromWatchlist,
    watchlist,
    getWatchlist,
    addToFavorites,
    removeFromFavorites,
    favorites,
    getFavorites,
  } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    // Fetch the watchlist and favorites if not already done
    if (!watchlist) {
      getWatchlist();
    }
    if (!favorites) {
      getFavorites();
    }
  }, [getWatchlist, getFavorites, watchlist, favorites]);

  useEffect(() => {
    // Check if the movie is in the watchlist
    if (watchlist) {
      setInWatchlist(watchlist.some((item) => item._id === movie._id));
    }

    // Check if the movie is in the favorites
    if (favorites) {
      setInFavorites(favorites.some((item) => item._id === movie._id));
    }
  }, [watchlist, favorites, movie._id]);

  const handleWatchlistAction = async () => {
    try {
      if (inWatchlist) {
        await removeFromWatchlist(movie._id);
        setInWatchlist(false);
      } else {
        await addToWatchlist(movie._id);
        setInWatchlist(true);
      }
    } catch (error) {
      console.log("Error updating watchlist", error);
    }
  };

  const handleFavoritesAction = async () => {
    try {
      if (inFavorites) {
        await removeFromFavorites(movie._id);
        setInFavorites(false);
      } else {
        await addToFavorites(movie._id);
        setInFavorites(true);
      }
    } catch (error) {
      console.log("Error updating favorites", error);
    }
  };

  return (
    <div className="movieDetails">
      <img
        src={movie.backdropImg}
        alt="coverImg"
        className="coverImg"
        style={{ width: "100%" }}
      />
      <div className="card detailsCard">
        <img
          src={movie.posterImg}
          alt="moviePoster"
          style={{ width: "15vw" }}
        />
        <h1>
          {movie.title} ({movie.releaseYear})
        </h1>
        <h2>⭐{Math.round(movie.rating)}</h2>
        <h3>{movie.description}</h3>
      </div>
      {user && (
        <>
          <button onClick={handleWatchlistAction}>
            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
          <button onClick={handleFavoritesAction}>
            {inFavorites ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </>
      )}
      {user && user.isAdmin && (
        <>
          <button onClick={() => setToggleEdit(!toggleEdit)}>Edit</button>
          <button onClick={() => deleteMovie(movie._id)}>Delete</button>
        </>
      )}
      {toggleEdit && (
        <EditForm toggleEdit={toggleEdit} setToggleEdit={setToggleEdit} />
      )}
    </div>
  );
}
