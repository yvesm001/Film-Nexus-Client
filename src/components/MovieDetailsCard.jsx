import React from "react";
import { useContext, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { AuthContext } from "../context/auth.context";
import EditForm from "./EditForm";

export default function MovieDetailsCard({ movie }) {
    const [toggleEdit, setToggleEdit] = useState(false);
  const { deleteMovie } = useContext(MovieContext);
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>{movie.title}</h1>
      <h2>{movie.releaseYear}</h2>
      <h3>{movie.description}</h3>
      {user && user.isAdmin && (
        <>
        <button onClick={() => setToggleEdit(!toggleEdit)} >Edit</button>
        <button onClick={() => deleteMovie(movie._id)}>Delete</button>
        </>
      )}
      {toggleEdit && (
        <EditForm toggleEdit={toggleEdit} setToggleEdit={setToggleEdit} />
      )}
    </div>
  );
}
