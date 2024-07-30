import React from "react";

const RequestCounter = (props) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full text-[#0753d8] space-y-2">
      <div className="flex items-center justify-center space-x-5">
        <img className="max-w-26 " src="./heart.svg" alt="heart image" />
        <h1 className="text-9xl font-bold">{props.count}</h1>
      </div>
      <h2 className="text-2xl font-medium italic">acts of kindness</h2>
    </div>
  );
};

export default RequestCounter;
