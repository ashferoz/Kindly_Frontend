import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const queryClient = useQueryClient();

  const { mutate: connect } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests/" + props.volunteer_id,
        "PUT",
        { volunteer_uuid },
        undefined
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      props.setShowUpdateModal(false);
    },
  });
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000078] z-50">
      <div className="bg-white w-[1000px] h-[600px]">
        <button
          onClick={() => {
            props.setShowUpdateModal(false);
          }}
        >
          close
        </button>
        <h1>{props.title}</h1>
        <h2>{props.username}</h2>
        <p>{props.urgency}</p>
        <p>{props.location}</p>
        <p>{props.category}</p>
        <h3>Details</h3>
        <p>{props.details}</p>
        <button>Connect</button>
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
          setShowUpdateModal={props.setShowUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default RequestModal;
