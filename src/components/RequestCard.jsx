import React from "react";

const RequestCard = (props) => {
  return (
    <>
      <div
        className="w-[350px] h-[250px] bg-[#0753d8] flex flex-col justify-between p-4 hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
        onClick={props.onClick}
      >
        <div className="flex-grow flex items-center justify-center">
          <p className="text-white text-lg">{props.category}</p>
        </div>
        <div className="flex flex-col items-start text-left">
          <h4 className="text-white text-md">{props.username}</h4>
          <h4 className="text-white text-xl font-semibold">{props.title}</h4>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
