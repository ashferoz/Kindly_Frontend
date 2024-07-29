import React from "react";

const RequestCounter = (props) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full text-[#f2e8cf] space-y-2">
      <div className="flex items-center justify-center space-x-5">
        <img className="max-w-24 " src="./heart.svg" alt="heart image" />
        <h1 className="text-8xl font-bold">{props.count}</h1>
      </div>
      <h2 className="text-2xl font-light">acts of kindness</h2>
    </div>
  );
};

export default RequestCounter;
