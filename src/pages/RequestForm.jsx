import React, { useContext, useState } from "react";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RequestForm = () => {
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests",
        "PUT",
        { user_uuid: userCtx.userUUID,
          title,
          details,
          request_category: category,
          request_urgency: urgency,
          request_location: location },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["userRequests"]);
      navigate("/profile")
    },
  });

  return (
    <div className="flex justify-center text-center min-h-screen bg-[#ffc0cc] font-epilogue">
      <div className="flex flex-col mt-20 mb-10">
        <h1 className="text-3xl font-bold font-fraunces mb-5">Request Form</h1>
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
          className="w-auto mb-5 h-20 pl-3 pt-2"
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
        <button
          onClick={mutate}
          className="bg-[#0753d8] text-white w-auto text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RequestForm;
