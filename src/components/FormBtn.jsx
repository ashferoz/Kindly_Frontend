import React from "react";

const FormBtn = (props) => {
  return (
    <button onClick={props.onClick} className="bg-[#0753d8] text-white w-40 text-xl h-9 rounded-xl hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out">
      {props.children}
    </button>
  );
};

export default FormBtn;
