import React from "react";
import { useContext } from "react";
import { MovieContext } from "../context/movie.context";

function ReviewCard({ user, review }) {
  const { getAllMovies } = useContext(MovieContext);
  const handleDelete = async (reviewId) => {
    try {
      const check = confirm("Are you sure you want to delete your review?");
      if (check) {
        const response = await api.delete("/review/" + reviewId);

        if (response.status === 200) {
          toast.success("Your review was deleted");
          getAllMovies();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="card">
      <div class="card-header">{user}user</div>
      <div class="card-body">
        <h5 class="card-text">{review} review</h5>
      </div>
    </div>
  );
}

export default ReviewCard;
