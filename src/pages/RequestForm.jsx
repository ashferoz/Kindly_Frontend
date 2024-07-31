import React, { useContext, useState } from "react";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

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
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    urgency: "",
    location: "",
  });

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests",
        "PUT",
        {
          beneficiary_uuid: userCtx.userUUID,
          title,
          details,
          category,
          urgency,
          location,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["userRequests"]);
      navigate(-1);
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

  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!title) {
      newErrors.title = "Title is required";
      isValid = false;
    } else {
      newErrors.title = "";
    }

    if (!category) {
      newErrors.category = "Category is required";
      isValid = false;
    } else {
      newErrors.category = "";
    }

    if (!urgency) {
      newErrors.urgency = "Urgency is required";
      isValid = false;
    } else {
      newErrors.urgency = "";
    }

    if (!location) {
      newErrors.location = "Location is required";
      isValid = false;
    } else {
      newErrors.location = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitBtn = () => {
    if (validate()) {
      mutate();
    }
  };

  return (
    <div className="flex justify-center text-center min-h-screen bg-[#ffc0cc] font-epilogue">
      <div className="flex flex-col mt-20 mb-10">
        <h1 className="text-3xl font-bold font-fraunces mb-5">Request Form</h1>
        <h2 className="text-sm mb-5">
          Please provide all required details to register with us.
        </h2>
        <p className="text-left  mb-1">
          Title<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-auto mb-5 h-10 pl-3"
          type="text"
        />
        {errors.title && <p className="text-[#eb5353] mb-5">{errors.title}</p>}

        <p className="text-left  mb-1">Details</p>
        <textarea
          value={details}
          placeholder="Optional but recommended"
          onChange={(e) => setDetails(e.target.value)}
          className="w-auto mb-5 h-20 pl-3 pt-2"
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
        {errors.category && <p className="text-[#eb5353] mb-5">{errors.category}</p>}

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

        {errors.urgency && <p className="text-[#eb5353] mb-5">{errors.urgency}</p>}

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

        {errors.location && <p className="text-[#eb5353] mb-5">{errors.location}</p>}

        <button
          onClick={handleSubmitBtn}
          className="bg-[#0753d8] text-white w-auto text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RequestForm;
