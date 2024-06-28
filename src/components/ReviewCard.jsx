import React, { useContext, useState } from "react";
import { MovieContext } from "../context/movie.context";
import { Rating } from "react-simple-star-rating";
import api from "../services/api";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";

export default function ReviewCard({ review, user }) {
  const { getAllMovies } = useContext(MovieContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(review.title);
  const [editedReview, setEditedReview] = useState(review.review);
  const [editedRating, setEditedRating] = useState(review.rating);

  const handleDelete = async (reviewId) => {
    try {
      const check = confirm("Are you sure you want to delete this review?");
      if (check) {
        const response = await api.delete("/review/" + reviewId);

        if (response.status === 200) {
          toast.success("Review successfully deleted");
          getAllMovies();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/review/" + review._id, {
        title: editedTitle,
        review: editedReview,
        rating: editedRating,
      });

      if (response.status === 200) {
        toast.success("Your review was updated");
        setIsEditing(false);
        getAllMovies();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //LINES 51-84 ARE WHAT USER SEES AFTER CLICKING EDIT ON REVIEW, LINES AFTER IS THE REGULAR REVIEW CARD
    <div>
      {user && user._id === review.creator._id && isEditing ? (
        <div>
          <form onSubmit={handleEdit} className="review-form">
            <h1>Edit review</h1>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              onChange={(e) => setEditedTitle(e.target.value)}
              value={editedTitle}
            />

            <label htmlFor="review">Review: </label>
            <textarea
              name="review"
              onChange={(e) => setEditedReview(e.target.value)}
              value={editedReview}
            />

            <label htmlFor="rating">Rating:</label>
            <Rating
              allowFraction={true}
              onClick={(rating) => setEditedRating(rating)}
              ratingValue={editedRating}
              initialValue={editedRating}
              name="rating"
              className="mb-3"
            />

            <button type="submit" className="mb-3">
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="review-card">
          <div className="profile-container">
            <img src={review.creator.profilePic} alt="Profile" />
          </div>
          <div className="review-content">
            <h3>{review.title}</h3>
            <p className="review-rating">
              {review.rating}{" "}
              <FontAwesomeIcon icon={faStar} />
            </p>
            <p>{review.review}</p>
            <p className="review-date">
              {new Date(review.createdAt).toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <p className="review-username">-{review.creator.username}</p>
          </div>
          <div className="review-actions">
            {user && user._id === review.creator._id && (
              <FontAwesomeIcon
                className="reviewIconStyle"
                icon={faEdit}
                onClick={() => setIsEditing(true)}
              />
            )}
            {user && (user._id === review.creator._id || user.isAdmin) && (
              <FontAwesomeIcon
                className="reviewIconStyle"
                icon={faTrash}
                onClick={() => handleDelete(review._id)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
