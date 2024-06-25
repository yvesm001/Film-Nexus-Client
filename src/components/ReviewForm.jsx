import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/movie.context";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";
import api from "../services/api";

export default function ReviewForm() {
  const [review, setReview] = useState({ title: "", rating: 0, review: "" });
  const { movieId } = useParams();
  const { getAllMovies } = useContext(MovieContext);
  
  

  const handleChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRating = (rating) => {
    setReview((prev) => ({ ...prev, rating: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/review/" + movieId, review);

      if (response.status === 200 || response.status === 201) {
        toast.success("Review submitted");
        getAllMovies();
        setReview({ title: "", rating: 0, review: "" });
        
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={review.title}
      />

      <label htmlFor="review">Review: </label>
      <textarea name="review" onChange={handleChange} value={review.review} />

      <label htmlFor="rating">Rating:</label>
      <Rating
        allowFraction={true}
        onClick={handleRating}
        ratingValue={review.rating}
        initialValue={0}
        name="rating"
      />

      <button type="submit">Submit Review</button>
    </form>
  );
}
