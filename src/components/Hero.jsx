import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <p>Interact With The Wind</p>
        <p>
          <span className="go-to-span">Go to</span>
          <a href="https://google.com">
            <span className="dashboard-btn">Dashboard</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Hero;
