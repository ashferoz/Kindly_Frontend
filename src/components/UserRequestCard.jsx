import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";

const UserRequestCard = (props) => {
  const queryClient = useQueryClient();
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch()

  
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

  return (
    <>
      <div
        className="w-[350px] h-[250px] bg-[#0753d8] flex flex-col justify-between p-4 font-epilogue"
      >
       <div className="flex flex-col">
  <div className="flex">
    <div className="w-24 text-white text-md font-medium">Title:</div>
    <div className="flex-1 text-white text-md ">{props.title}</div>
  </div>
  <div className="flex">
    <div className="w-24 text-white text-md font-medium">Category:</div>
    <div className="flex-1 text-white text-md ">{props.category}</div>
  </div>
  <div className="flex">
    <div className="w-24 text-white text-md font-medium">Urgency:</div>
    <div className="flex-1 text-white text-md ">{props.urgency}</div>
  </div>
  <div className="flex">
    <div className="w-24 text-white text-md font-medium">Location:</div>
    <div className="flex-1 text-white text-md ">{props.location}</div>
  </div>
  <div className="flex">
    <div className="w-24 text-white text-md font-medium">Status:</div>
    <div className="flex-1 text-white text-md ">{props.status}</div>
  </div>
</div>
        <div className="flex flex-col justify-end">
          <button className="bg-[#07d873] m-1 rounded-md" onClick={props.onClick}>Update</button>
          <button onClick={mutate} className="bg-[#07d873] m-1 rounded-md">Remove</button>
        </div>
      </div>
    </>
  );
};

export default UserRequestCard;
