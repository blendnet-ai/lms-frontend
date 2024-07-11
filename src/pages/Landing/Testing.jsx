import React from "react";
import "../Landing/landing.css";
const Testing = () => {
  return (
    <span class="curved-underline">
      Curved Underline
      <svg viewBox="0 0 100 20" preserveAspectRatio="none">
        <path
          d="M0,10 Q50,0 100,10"
          fill="none"
          stroke="#000"
          stroke-width="2"
        />
      </svg>
    </span>
  );
};

export default Testing;
