import React, { useContext } from "react";
import UserContext from "../contexts/user";

const ConnectionSideBarCard = (props) => {
  const userCtx = useContext(UserContext);
  return (
    <>
      {userCtx.role === "VOLUNTEER" && (
        <>
          <div
            onClick={() => props.setSelectRequest(props)}
            className="border border-[#fff8df] p-4 cursor-pointer hover:bg-[#ffe78f] focus:bg-[#ffde69] transition-colors duration-150 ease-in-out"
            tabIndex="0"
          >
            <h2 className="text-2xl ">{props.username}</h2>
            <h3 className="font-epilogue py-1">{props.title}</h3>
            <h3 className="font-epilogue bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl text-xs">{props.status.toLowerCase()}</h3>
          </div>
        </>
      )}
      {userCtx.role === "BENEFICIARY" && (
        <>
          <div
            onClick={() => props.setSelectRequest(props)}
            className="border border-[#fff8df] p-4 cursor-pointer hover:bg-[#ffe78f] focus:bg-[#ffde69] transition-colors duration-150 ease-in-out"
            tabIndex="0"
          >
            <h2 className="text-2xl">{props.usernameVolunteer}</h2>
            <h3 className="font-epilogue py-1">{props.title}</h3>
            <h3 className="font-epilogue bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl text-xs">{props.status.toLowerCase()}</h3>
          </div>
        </>
      )}
    </>
  );
};

export default ConnectionSideBarCard;
