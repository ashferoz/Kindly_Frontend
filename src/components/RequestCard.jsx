import React from "react";

const RequestCard = () => {
  return (
    <>
      <div className="w-[350px] h-[250px] bg-[#0753d8] flex flex-col justify-between p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
        <div className="flex-grow flex items-center justify-center">
          <p className="text-white text-lg">Request Type</p>
        </div>
        <div className="flex flex-col items-start text-left">
          <h4 className="text-white text-md">Username</h4>
          <h4 className="text-white text-xl font-semibold">Request Title</h4>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
