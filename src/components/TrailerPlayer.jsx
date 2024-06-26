import React from "react";
import ReactPlayer from "react-player/youtube";

export default function TrailerPlayer({ movie }) {
  return (
    <div>
      <h1>Trailer</h1>
      <ReactPlayer url={movie.trailerUrl} />
    </div>
  );
}
