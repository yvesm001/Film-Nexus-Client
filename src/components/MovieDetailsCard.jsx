import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/movie.context";
import { AuthContext } from "../context/auth.context";
import EditForm from "./EditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHeart,
  faMinus,
  faHeartBroken,
  faEdit,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

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
    <div
      className="movieDetails"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 1)),url(${movie.backdropImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "117vh",
        marginTop: "2rem",
      }}
    >
      <div className="card detailsCard">
        <div className="img-icons">
          <img
            src={movie.posterImg}
            alt="moviePoster"
            style={{ width: "15vw" }}
            className="moviePoster"
          />
          {user && !user.isAdmin && (
            <div>
              <FontAwesomeIcon
                className="iconStyle"
                icon={inWatchlist ? faMinus : faPlus}
                onClick={handleWatchlistAction}
              />
              <FontAwesomeIcon
                className="iconStyle"
                icon={inFavorites ? faHeartBroken : faHeart}
                onClick={handleFavoritesAction}
              />
            </div>
          )}
          {user && user.isAdmin && (
            <div>
              <FontAwesomeIcon
                className="iconStyle"
                icon={faEdit}
                onClick={() => setToggleEdit(!toggleEdit)}
              />
              <FontAwesomeIcon
                className="iconStyle"
                icon={faTrash}
                onClick={() => deleteMovie(movie._id)}
              />
            </div>
          )}
          {toggleEdit && (
            <EditForm toggleEdit={toggleEdit} setToggleEdit={setToggleEdit} />
          )}
        </div>
        <div className="infoMovie">
          <h1>
            {movie.title} ({movie.releaseYear}) ⭐{movie.rating.toFixed(1)}
          </h1>
          <h2>{movie.description}</h2>
          <h3>Genre:</h3>
          <h4>{movie.genre.join(" • ")}</h4>
        </div>
      </div>
    </div>
  );
}
