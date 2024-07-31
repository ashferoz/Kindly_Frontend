import React from "react";

const VolunteerRequestCounter = (props) => {
  return (
    <div className="flex text-[#0753d8] w-auto ml-5">
      <div className="flex items-center space-x-2">
        <img className="max-w-8 " src="./heart.svg" alt="heart image" />
        <h1 className="text-2xl font-bold">{props.count}</h1>
      </div>
    </div>
  );
};

export default VolunteerRequestCounter;
