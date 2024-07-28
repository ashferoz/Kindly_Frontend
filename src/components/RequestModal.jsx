import React, { useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from "../contexts/user";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000078] z-50 font-epilogue">
      <div className="bg-white w-[1000px] h-[600px] flex">
        <div className="w-2/5 h-full">
          <img
            className="object-cover w-full h-full"
            src="../src/assets/clothes.jpg"
            alt=""
          />
        </div>
        <div className="w-3/5 p-8">
          <button
            className="bg-[#ee2626]"
            onClick={() => {
              props.setShowRequestModal(false);
            }}
          >
            close
          </button>
          <div className="mx-8">
            <h1 className="text-5xl my-5 font-fraunces">{props.title}</h1>
            <h2 className="text-2xl my-1">{props.username}</h2>
            <hr className="mb-6" />
            <div className="text-xs font-normal mb-5">
              <p className="bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl">
                {props.urgency}
              </p>
              <p className="bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl">
                {props.location}
              </p>
              <p className="bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl">
                {props.category}
              </p>
            </div>
            <h3>Details:</h3>
            <p>{props.details}</p>
          </div>
          {userCtx.role === "BENEFICIARY" ? null : (
            <button className="bg-[#eb5353] hover:bg-[#de5050] rounded-xl px-3 py-1 text-white">
              Help out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const RequestModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          title={props.request.title}
          username={props.request.username}
          details={props.request.details}
          category={props.request.category}
          urgency={props.request.urgency}
          location={props.request.location}
          volunteer_id={props.request.volunteer_id}
          setShowRequestModal={props.setShowRequestModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default RequestModal;
