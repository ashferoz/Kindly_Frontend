import React from "react";
import styles from "../components/css/RequestCounter.module.css";

const RequestCounter = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full text-[#0753d8] space-y-4">
      <div className="flex items-center justify-center space-x-[20px]">
        <img className="max-w-24" src="../public/heart.svg" alt="heart image" />
        <h1 className="text-8xl font-bold">8,439</h1>
      </div>
      <h2 className="text-4xl font-light">acts of kindness</h2>
    </div>

    
  );
};

export default RequestCounter;
