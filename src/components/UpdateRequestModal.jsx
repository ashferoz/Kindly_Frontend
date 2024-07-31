import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../contexts/user";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(props.title);
  const [details, setDetails] = useState(props.details);
  const [category, setCategory] = useState(props.category);
  const [urgency, setUrgency] = useState(props.urgency);
  const [location, setLocation] = useState(props.location);
  const [status, setStatus] = useState(props.status);

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests/" + props.id,
        "PATCH",
        { title, details, category, urgency, location, status },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["userRequests"]);
      props.setShowUpdateModal(false);
    },
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000078] z-50 font-epilogue">
      <div className="w-[600px] h-auto bg-[#ffc0cc] text-[#373737] font-epilogue relative">
      <button
      onClick={() => props.setShowUpdateModal(false)}
      className="absolute top-2 right-2 bg-[#eb5353] hover:bg-[#e96363] transition-colors duration-200 ease-in-out text-white px-2 py-1"
    >
      Cancel
    </button>
        <div className="flex flex-col p-8">
          <h1 className="text-3xl text-center font-bold font-fraunces mb-3">
            Update Request
          </h1>
          <p className="text-left  mb-1">Title</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-auto mb-5 h-10 pl-3"
            type="text"
          />

          <p className="text-left  mb-1">Details</p>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-auto mb-5 h-20 p-3"
            rows="4"
            cols="50"
          />

          <p className="text-left  mb-1">Category</p>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-auto  mb-5 h-10 pl-3"
            type="text"
          />
          <p className="text-left  mb-1">Urgency</p>
          <input
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="w-auto  mb-5 h-10 pl-3"
            type="text"
          />
          <p className="text-left  mb-1">Location</p>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-auto  mb-5 h-10 pl-3"
            type="text"
          />
          <p className="text-left mb-1">Status</p>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-auto  mb-5 h-10 pl-3"
            type="text"
          />
          <button
            onClick={mutate}
            className="hover:bg-[#4d7aff] bg-[#0753d8] text-white text-s h-9 rounded-lg transition-colors duration-200 ease-in-out mt-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateRequestModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          title={props.request.title}
          username={props.request.username}
          details={props.request.details}
          status={props.request.status}
          category={props.request.category}
          urgency={props.request.urgency}
          location={props.request.location}
          id={props.request.id}
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default UpdateRequestModal;
