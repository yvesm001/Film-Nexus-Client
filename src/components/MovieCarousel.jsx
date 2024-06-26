import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../context/movie.context";

function MovieCarousel() {
  const { movies } = useContext(MovieContext);

  useEffect(() => {
    const carouselElement = document.getElementById("carouselExampleCaptions");
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });

      setTimeout(() => {
        carousel.next();
      }, 3000);
    }
  }, []);

  return (
    <div className="carousel-container bd-example">
      <div
        id="carouselExampleCaptions"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        data-interval="3000"
      >
        <div className="carousel-inner">
          {movies ? (
            movies.map((movie, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={movie._id}
              >
                <Link to={`/movies/${movie._id}`}>
                  <img
                    src={movie.backdropImg}
                    className="d-block w-100"
                    alt={`Poster of ${movie.title}`}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h1>{movie.title}</h1>
                    <p>{movie.description}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-target="#carouselExampleCaptions"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-target="#carouselExampleCaptions"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default MovieCarousel;
