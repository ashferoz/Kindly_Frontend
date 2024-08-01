import React, { useContext } from "react";
import MsgBox from "./MsgBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";

const ChatArea = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);


  const { isSuccess:messagesIsSuccess, isError: messagesIsError, error:messagesError, isFetching:messagesIsFetching, data: messagesData } = useQuery({
    queryKey: ["messages"],
    queryFn: async () =>
      await usingFetch(
        "/messages/" + props.request.connection_id,
        "GET",
        undefined,
        userCtx.accessToken
      ),
  });

  const { mutate: sendMsg } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/messages/",
        "PUT",
        { content, volunteer_uuid : userCtx.userUUID , beneficiary_uuid, connection_id },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });


  console.log(props.request);

  return (
    <>
      <div className=" overflow-y-auto p-5 h-[500px]">
        {messagesIsSuccess && messagesData.map((item) => {
            return (
                <MsgBox 
                request={props.request}
                content={item.content}
                />
            )
        })}
     
      </div>
      <div className="flex mb-5 mx-5 mt-5">
        <input type="text" className="border-2 w-full mr-2 p-1" />
        <button className="hover:bg-[#2fab5e] bg-[#32bf68] transition-colors duration-200 ease-in-out text-white w-fit py-1 px-2">
          Send
        </button>
      </div>
    </>
  );
};

export default ChatArea;
