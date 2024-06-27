import React from "react";
import ReactPlayer from "react-player/youtube";

export default function TrailerPlayer({ movie }) {
  return (
    <div className="trailer-container">
    <div className="movieTrailer">
      <h1 style={{ borderBottom: "7px solid red", color: "#fff" }}>Trailer</h1>
      <div className="videoPlayer">
        <ReactPlayer
          url={movie.trailerUrl}
          style={{ border: "2px solid red" }}
        />
      </div>
    </div>
    </div>
  );
}
