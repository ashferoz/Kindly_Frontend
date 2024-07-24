import React from "react";

const FormBtn = (props) => {
  return (
    <button className="bg-[#0753d8] text-white w-44 text-xl h-10 rounded-xl hover:bg-[#eb5353]">
      {props.children}
    </button>
  );
};

export default FormBtn;
