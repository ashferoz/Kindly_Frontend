import React from "react";

const FormBtn = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-[#32bf68] text-white w-40 text-xl h-9 rounded-xl hover:bg-[#2fab5e] transition-colors duration-300 ease-in-out"
    >
      {props.children}
    </button>
  );
};

export default FormBtn;
