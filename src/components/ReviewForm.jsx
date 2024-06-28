import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/movie.context";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import api from "../services/api";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

export default function ReviewForm() {
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState({ title: "", rating: 0, review: "" });
  const { movieId } = useParams();
  const { getAllMovies } = useContext(MovieContext);

  const [rating, setRating] = useState(0);

  const handleReset = () => {
    setRating(0);
  };

  const handleChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRating = (rating) => {
    setReview((prev) => ({ ...prev, rating: rating }));
    setRating(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/review/" + movieId, review);

      if (response.status === 200 || response.status === 201) {
        toast.success("Review submitted");
        getAllMovies();
        setReview({ title: "", rating: 0, review: "" });
        handleReset();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating review");
    }
  };

  useEffect(() => {
    console.log(review);
  }, [review]);

  return (
    <>
      {!user || user.isAdmin ? (
        <p className="review-form">
          <Link to="/login">Login</Link> to leave a review.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="review-form">
          <h1>Leave a review</h1>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={review.title}
          />

          <label htmlFor="review">Review:</label>
          <textarea
            name="review"
            onChange={handleChange}
            value={review.review}
          />

          <label htmlFor="rating">Rating:</label>
          <div className="rating-container">
            <Rating
              allowFraction={true}
              onClick={handleRating}
              ratingValue={rating}
              initialValue={rating}
              name="rating"
            />
          </div>

          <button type="submit">Submit Review</button>
        </form>
      )}
    </>
  );
}
