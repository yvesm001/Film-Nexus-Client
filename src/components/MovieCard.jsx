import React from 'react'

export default function MovieCard({ title, description, releaseYear, genre, cast, posterImg, backdropImg, rating, trailerUrl, popularity}) {
  return (
    <div>
      <h1>{title}</h1>
      <img src={posterImg} />
      <p>{releaseYear}</p>
      <p>{description}</p>
    </div>
  )
}
