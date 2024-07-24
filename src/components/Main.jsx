import React from "react";
import RequestCounter from "./RequestCounter";
import FormBtn from "./FormBtn";
import RequestCard from "./RequestCard";

const Main = () => {
  return (
    <div>
      <RequestCounter />
      <h3 className="font-epilogue text-5xl text-[#0753d8] text-center py-10 font-light italic">
        Give and receive help in your community.
      </h3>
      <div className="font-epilogue flex justify-center space-x-20">
        <FormBtn>Want to help?</FormBtn>
        <FormBtn>Need help?</FormBtn>
      </div>
      <div className="w-full px-10 py-20">
        <RequestCard />
      </div>
    </div>
  );
};

export default Main;
