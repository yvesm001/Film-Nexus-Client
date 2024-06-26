import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/movie.context";

export default function EditForm({ toggleEdit, setToggleEdit }) {
  const [currMovie, setCurrMovie] = useState(null);
  const { movieId } = useParams();
  const { movies, updateMovie } = useContext(MovieContext);

  const handleChange = (e) => {
    setCurrMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (e) => {
    setCurrMovie((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.split(",").map((item) => item.trim()),
    }));
  };

  useEffect(() => {
    movies && setCurrMovie(movies.find((movie) => movie._id === movieId));
  }, [toggleEdit]);
  return (
    <>
    <h1>Edit Form</h1>
    {currMovie && (
        
      <form className="d-flex flex-column justify-content-center align-items-center gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          updateMovie(currMovie, movieId, setToggleEdit);
        }}
      >
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={currMovie.title}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={currMovie.description}
        />

        <label htmlFor="releaseYear">Release Year:</label>
        <input
          type="number"
          name="releaseYear"
          onChange={handleChange}
          value={currMovie.releaseYear}
        />

        <label htmlFor="posterImg">Poster Image: </label>
        <input
          type="text"
          name="posterImg"
          onChange={handleChange}
          value={currMovie.posterImg}
        />

        <label htmlFor="backdropImg">Backdrop Image:</label>
        <input
          type="text"
          name="backdropImg"
          onChange={handleChange}
          value={currMovie.backdropImg}
        />

        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          name="rating"
          onChange={handleChange}
          value={currMovie.rating}
        />

        <label htmlFor="trailerUrl">Trailer: </label>
        <input
          type="text"
          name="trailerUrl"
          onChange={handleChange}
          value={currMovie.trailerUrl}
        />

        <label htmlFor="genre">Genres:</label>
        <input
          type="text"
          name="genre"
          onChange={handleArrayChange}
          value={currMovie.genre}
        />

        <label htmlFor="cast">Cast:</label>
        <input
          type="text"
          name="cast"
          onChange={handleArrayChange}
          value={currMovie.cast}
        />

        <button type="submit">Save Changes</button>
      </form>
    )}
    </>);
}
