import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";

const UserRequestCard = (props) => {
  const queryClient = useQueryClient();
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests/" + props.id,
        "DELETE",
        undefined,
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["userRequests"]);
    },
  });

  const status = props.status

  return (
    <>
      <div className="w-[350px] h-auto bg-[#ffeca7] flex flex-col justify-between p-4 font-epilogue text-[#373737] hover:scale-105 transition-transform duration-200 ease-in-out">
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-24  text-md font-medium">Title:</div>
            <div className="flex-1  text-md ">{props.title}</div>
          </div>
          <div className="flex">
            <div className="w-24  text-md font-medium">Details:</div>
            <div className="flex-1  text-md ">{props.details}</div>
          </div>
          <div className="flex">
            <div className="w-24  text-md font-medium">Category:</div>
            <div className="flex-1  text-md ">{props.category.toLowerCase()}</div>
          </div>
          <div className="flex">
            <div className="w-24  text-md font-medium">Urgency:</div>
            <div className="flex-1  text-md ">{props.urgency.toLowerCase()}</div>
          </div>
          <div className="flex">
            <div className="w-24  text-md font-medium">Location:</div>
            <div className="flex-1  text-md ">{props.location.toLowerCase()}</div>
          </div>
          <div className="flex">
            <div className="w-24  text-md font-medium">Status:</div>
            <div className="flex-1  text-md ">{props.status.toLowerCase()}</div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <button
            className="hover:bg-[#4d7aff] bg-[#0753d8] text-white m-1 text-s h-8 mt-5 rounded-lg transition-colors duration-200 ease-in-out"
            onClick={props.onClick}
          >
            Update
          </button>
          <button onClick={mutate} className="bg-[#eb5353] hover:bg-[#e96363] text-white m-1 text-s h-8 rounded-lg transition-colors duration-200 ease-in-out">
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default UserRequestCard;
