import React from "react";
import { useNavigate } from "react-router-dom";

const RequestConnectedCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[350px] h-auto bg-[#ffeca7] flex flex-col justify-between p-4 font-epilogue text-[#373737] hover:scale-105 transition-transform duration-200 ease-in-out">
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-28  text-md font-medium">Beneficiary:</div>
            <div className="flex-1  text-md ">{props.beneficiary_username}</div>
          </div>
          <div className="flex">
            <div className="w-28  text-md font-medium">Title:</div>
            <div className="flex-1  text-md ">{props.title}</div>
          </div>
          <div className="flex">
            <div className="w-28  text-md font-medium">Category:</div>
            <div className="flex-1  text-md ">{props.category}</div>
          </div>
          <div className="flex">
            <div className="w-28  text-md font-medium">Urgency:</div>
            <div className="flex-1  text-md ">{props.urgency}</div>
          </div>
          <div className="flex">
            <div className="w-28  text-md font-medium">Location:</div>
            <div className="flex-1  text-md ">{props.location}</div>
          </div>
          <div className="flex">
            <div className="w-28  text-md font-medium">Status:</div>
            <div className="flex-1  text-md ">{props.status}</div>
          </div>
        </div>
        <div className="flex flex-col mt-5 justify-end">
          {(props.status === "OPEN" || props.status === "ONGOING") && (
            <button
              className="hover:bg-[#4d7aff] bg-[#0753d8] text-white m-1 text-s h-8 mt-5 rounded-lg transition-colors duration-200 ease-in-out"
              onClick={() => navigate("/inbox")}
            >
              Chat with {props.beneficiary_username}
            </button>
          )}
          {/* <button
            className="bg-[#8cb369]  m-1 rounded-md"
            onClick={props.onClick}
          >
            Mark complete
          </button> */}
        </div>
      </div>
    </>
  );
};

export default RequestConnectedCard;
