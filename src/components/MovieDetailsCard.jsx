import React from "react";
import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/movie.context";
import { AuthContext } from "../context/auth.context";
import EditForm from "./EditForm";

export default function MovieDetailsCard({ movie }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const { deleteMovie, addToWatchlist, removeFromWatchlist, watchlist, getWatchlist } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    // Fetch the watchlist if not already done
    if (!watchlist) {
      getWatchlist();
    }
    // Check if the movie is in the watchlist
    if (watchlist && watchlist.some(item => item._id === movie._id)) {
      setInWatchlist(true);
    } else {
      setInWatchlist(false);
    }
  }, [watchlist, movie._id, getWatchlist]);

  const handleWatchlistAction = async () => {
    try {
        if (inWatchlist) {
            await removeFromWatchlist(movie._id);
            setInWatchlist(false);
        } else {
            await addToWatchlist(movie._id);
            setInWatchlist(true)
        }
    } catch (error) {
        console.log("Error updating watchlist", error)
    }
  }

//   const handleAddToWatchlist = async () => {
//     console.log("Add to watchlist clicked");
//     try {
//       await addToWatchlist(movie._id);
//       console.log("Movie added to watchlist");
//     } catch (error) {
//       console.log("Error adding movie to watchlist", error);
//     }
//   };
  return (
    <div>
      <h1>{movie.title}</h1>
      <h2>{movie.releaseYear}</h2>
      <h3>{movie.description}</h3>
      {user && (
        <button onClick={handleWatchlistAction}>
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
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
