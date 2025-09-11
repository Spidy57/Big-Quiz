import React from "react";

import Silk from "../components/Silk";

import "./Home.css";

const Home = () => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 0,
        }}
      >
        <Silk
          speed={5}
          scale={1}
          color="#0030a0"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <div className="home-content">
        <h1 className="title">Welcome to Big Quiz!</h1>
        <p>
          Your ultimate destination for fun and engaging quizzes on a variety of
          topics. Challenge yourself, learn new things, and have a blast!
        </p>
      </div>
    </div>
  );
};

export default Home;
