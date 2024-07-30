import React from "react";

const RequestCard = (props) => {
  return (
    <>
      <div
        className="relative w-[350px] h-[350px] bg-[#fffef9] text-[#373737] flex flex-col justify-end hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
        onClick={props.onClick}
      >
        <div className="absolute top-0 left-0 w-full h-[75%] overflow-hidden">
          <img
            className="object-cover w-full h-full"
            src="../src/assets/clothes.jpg"
            alt=""
          />
        </div>
        <div className="relative py-1 px-2 h-[25%] z-10 bg-[#ffeca7]">
          <div className="flex flex-col items-start">
            <h4 className="text-md font-epilogue">{props.username}</h4>
            <h4 className="text-xl font-semibold">{props.title}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
