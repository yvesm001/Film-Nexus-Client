import React from "react";

const imgUrl =
  "https://cdn.mos.cms.futurecdn.net/PuXipAW3AXUzUJ4uYyxPKC-1200-80.jpg";

function ErrorPage() {
  return (
    <div className="errorPage">
      <img src={imgUrl} alt="errorImg" style={{ width: "53vw" }} />
    </div>
  );
}

export default ErrorPage;
