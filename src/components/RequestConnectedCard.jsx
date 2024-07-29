import React from "react";

const RequestConnectedCard = (props) => {
  return (
    <>
      <div className="w-[350px] h-auto bg-[#9dc3c2] flex flex-col justify-between p-4 font-epilogue text-[#352a1f]">
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
            <div className="w-28  text-md font-medium">Details:</div>
            <div className="flex-1  text-md ">{props.details}</div>
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
            {props.status === 'OPEN' &&   <button
            className="bg-[#77a6b6]  m-1 rounded-md"
            
          >
            Chat with {props.beneficiary_username}
          </button>}
          <button
            className="bg-[#8cb369]  m-1 rounded-md"
            onClick={props.onClick}
          >
            Mark complete
          </button>
          <button className="bg-[#de8333]  m-1 rounded-md">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default RequestConnectedCard;
