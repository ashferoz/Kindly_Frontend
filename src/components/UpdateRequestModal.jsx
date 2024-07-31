import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../contexts/user";
import { useQuery } from "@tanstack/react-query";

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

  const {
    isSuccess: categorySuccess,
    isError: categoryIsError,
    error: categoryError,
    isFetching: categoryIsFetching,
    data: categorydData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      await usingFetch("/category/", "GET", undefined, undefined),
  });

  const {
    isSuccess: locationSuccess,
    isError: locationIsError,
    error: locationError,
    isFetching: locationIsFetching,
    data: locationdData,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () =>
      await usingFetch("/locations/", "GET", undefined, undefined),
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

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-auto mb-5 h-10 pl-3"
          >
            <option value="" disabled>
              Select category
            </option>
            {categorySuccess &&
              categorydData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id.toLowerCase().replace("_", " ")}
                </option>
              ))}
          </select>

          <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="w-auto mb-5 h-10 pl-3"
        >
          <option value="" disabled>
            Select urgency
          </option>
          <option value="URGENT">urgent</option>
          <option value="NOT_URGENT">not urgent</option>
        </select>


          <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-auto mb-5 h-10 pl-3"
        >
          <option value="" disabled>
            Select location
          </option>
          {locationSuccess &&
            locationdData.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id.toLowerCase().replace("_", " ")}
              </option>
            ))}
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-auto mb-5 h-10 pl-3"
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="OPEN">open</option>
          <option value="ONGOING">ongoing</option>
          <option value="COMPLETE">complete</option>
        </select>


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
