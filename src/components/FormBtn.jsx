import React from "react";

const FormBtn = (props) => {
  return (
    <button onClick={props.onClick} className="bg-[#386641] text-white w-40 text-xl h-9 rounded-xl hover:bg-[#467c51] active:bg-[#3c6c46] transition-colors duration-150 ease-in-out">
      {props.children}
    </button>
  );
};

export default FormBtn;
