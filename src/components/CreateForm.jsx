import React, { useContext, useState } from "react";
import { MovieContext } from "../context/movie.context";

export default function CreateForm() {
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    description: "",
    releaseYear: 0,
    posterImg: "",
    backdropImg: "",
    rating: 0,
    trailerUrl: "",
    genre: [],
    cast: [],
  });
  const { createMovie } = useContext(MovieContext);

  const handleChange = (e) => {
    setMovieInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (e) => {
    setMovieInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.split(",").map((item) => item.trim()),
    }));
  };

  return (
    <div className="create-container">
    <h1>Add a Movie</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createMovie(movieInfo);
      }}
      className="review-form"
    >
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={movieInfo.title}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        onChange={handleChange}
        value={movieInfo.description}
      />

      <label htmlFor="releaseYear">Release Year:</label>
      <input
        type="number"
        name="releaseYear"
        onChange={handleChange}
        value={movieInfo.releaseYear}
      />

      <label htmlFor="posterImg">Poster Image: </label>
      <input
        type="text"
        name="posterImg"
        onChange={handleChange}
        value={movieInfo.posterImg}
      />

      <label htmlFor="backdropImg">Backdrop Image:</label>
      <input
        type="text"
        name="backdropImg"
        onChange={handleChange}
        value={movieInfo.backdropImg}
      />

      <label htmlFor="rating">Rating: </label>
      <input
        type="number"
        name="rating"
        onChange={handleChange}
        value={movieInfo.rating}
      />

      <label htmlFor="trailerUrl">Trailer: </label>
      <input
        type="text"
        name="trailerUrl"
        onChange={handleChange}
        value={movieInfo.trailerUrl}
      />

      <label htmlFor="genre">Genres:</label>
      <input
        type="text"
        name="genre"
        onChange={handleArrayChange}
        value={movieInfo.genre}
      />

      <label htmlFor="cast">Cast:</label>
      <input
        type="text"
        name="cast"
        onChange={handleArrayChange}
        value={movieInfo.cast}
      />

      <button type="submit">Add Movie</button>
    </form>
    </div>
  );
}
