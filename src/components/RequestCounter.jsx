import React from "react";
import styles from "../components/css/RequestCounter.module.css";

const RequestCounter = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto w-full text-[#0753d8] space-y-4 py-10">
        <div className="flex items-center justify-center space-x-[20px]">
          <img
            className="max-w-24"
            src="../public/heart.svg"
            alt="heart image"
          />
          <h1 className="text-8xl font-bold">8,439</h1>
        </div>
        <h2 className="text-4xl font-light">acts of kindness</h2>
      </div>
      <h3 className="font-epilogue text-5xl text-[#0753d8] text-center py-5 font-light italic">Give and receive help in your community.</h3>
    </>
  );
};

export default RequestCounter;
