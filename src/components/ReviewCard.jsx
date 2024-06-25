import React from "react";

export default function ReviewCard({ review }) {
  return (
    <div>
      <img src={review.creator.profilePic} />
      <h3>{review.title}</h3>
      <p>{review.rating}⭐</p>
      <p>{review.review}</p>
      <p>
        {new Date(review.createdAt).toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <p>{review.creator.username}</p>
    </div>
  );
}
