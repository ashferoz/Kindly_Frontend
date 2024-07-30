import React, { useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from "../contexts/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests/" + props.id,
        "PUT",
        {
          volunteer_uuid: userCtx.userUUID,
          beneficiary_uuid: props.beneficiary_uuid,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["requests"]);
      props.setShowRequestModal(false);
      navigate("/inbox");
    },
  });

  const handleBtn = () => {
    if (!userCtx.accessToken) {
      navigate("/signin");
    } else {
      mutate();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000078] z-50 font-epilogue">
      <div className="bg-[#fffae1] w-[800px] h-[600px] text-[#373737] flex">
        <div className="w-2/5 h-full">
          <img
            className="object-cover w-full h-full"
            src="../src/assets/clothes.jpg"
            alt=""
          />
        </div>
        <div className="w-3/5 p-8 relative flex flex-col justify-between">
          <button
            className="bg-[#eb5353] hover:bg-[#e96363] transition-colors duration-200 ease-in-out text-white px-2 py-1 absolute top-2 right-3"
            onClick={() => {
              props.setShowRequestModal(false);
            }}
          >
            close
          </button>
          <div className="mx-8 h-full">
            <h1 className="text-5xl my-5 font-fraunces">{props.title}</h1>
            <h2 className="text-2xl my-1">{props.username}</h2>
            <hr className="mb-6" />
            <div className="text-xs h-fit font-normal mb-5">
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
            <div className="flex mt-auto">
              <button
                onClick={handleBtn}
                className="hover:bg-[#4d7aff] bg-[#0753d8] transition-colors duration-200 ease-in-out px-3 py-1 text-white w-full"
              >
                Help out
              </button>
            </div>
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
          id={props.request.id}
          title={props.request.title}
          username={props.request.username}
          details={props.request.details}
          category={props.request.category}
          urgency={props.request.urgency}
          location={props.request.location}
          volunteer_id={props.request.volunteer_id}
          setShowRequestModal={props.setShowRequestModal}
          beneficiary_uuid={props.request.beneficiary_uuid}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default RequestModal;
