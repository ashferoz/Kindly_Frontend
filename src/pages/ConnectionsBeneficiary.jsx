import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConnectionSideBarCard from "../components/ConnectionSideBarCard";
import ChatArea from "../components/ChatArea";

const ConnectionsBeneficiary = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [selectRequest, setSelectRequest] = useState(null);
  const queryClient = useQueryClient();

  const {
    isSuccess: requestConnectIsSuccess,
    isError: requestConnectIsError,
    error: requestConnectError,
    isFetching: requestConnectIsFetching,
    data: requestConnectData,
  } = useQuery({
    queryKey: ["requestConnections"],
    queryFn: async () =>
      await usingFetch(
        "/api/connected/beneficiary",
        "POST",
        {
          beneficiary_uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
  });

  const { mutate: update } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests/" + selectRequest.requestId,
        "PATCH",
        { status: "OPEN" },
        userCtx.accessToken
      ),
    onSuccess: () => {
      setSelectRequest((prev) => ({
        ...prev,
        status: "OPEN",
      }));
      queryClient.invalidateQueries(["requestConnections"]);
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/connection/" + selectRequest.connection_id,
        "DELETE",
        undefined,
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["requestConnections"]);
    },
  });

  return (
    <>
      <div className="bg-[#fffae1] h-[93vh] w-screen text-[#352a1f] mt-14 flex flex-wrap justify-between">
        <div className="w-1/4 h-full overflow-y-auto bg-[#ffeca7]">
          {requestConnectIsSuccess &&
            requestConnectData.map((item) => {
              return (
                <ConnectionSideBarCard
                  key={item.connection_id}
                  connection_id={item.connection_id}
                  requestId={item.request_id}
                  title={item.title}
                  details={item.details}
                  category={item.category}
                  urgency={item.urgency}
                  location={item.location}
                  status={item.status}
                  bio={item.bio}
                  usernameBeneficary={item.username}
                  usernameVolunteer={item.volunteer_username}
                  setSelectRequest={setSelectRequest}
                />
              );
            })}

          {requestConnectIsFetching && <h1>Loading...</h1>}

          {requestConnectIsError && <div>{requestConnectError.message}</div>}
        </div>

        {selectRequest ? (
          <>
            <div className="w-3/4 h-full flex flex-col justify-between font-epilogue">
              <div className="pl-5 pt-5 pb-2 bg-[#eeeadd] border-b border-[#dfdcd1]">
                <h4>Username: {selectRequest.usernameVolunteer}</h4>
                <div className="flex">
                  <h5 className="mr-5">Bio: {selectRequest.bio}</h5>
                </div>
                <div className="my-1">
                  {selectRequest && selectRequest.status === "ONGOING" && (
                    <button
                      onClick={update}
                      className="hover:bg-[#4d7aff] bg-[#0753d8] text-sm transition-colors duration-200 ease-in-out text-white w-fit py-1 px-2 mr-2"
                    >
                      Decline offer
                    </button>
                  )}
                  <button
                    onClick={remove}
                    className="hover:bg-[#4d7aff] bg-[#0753d8] text-sm transition-colors duration-200 ease-in-out text-white w-fit py-1 px-2 mr-2"
                  >
                    Delete Connection
                  </button>
                </div>
              </div>

              <div className="absolute bottom-[80px]">
                {selectRequest && selectRequest.status === "COMPLETE" && (
                  <p className="mx-5 px-3 py-1 rounded-3xl text-sm bg-[#e96363] text-white">
                    This request is closed. Delete connection if no longer
                    needed.
                  </p>
                )}
              </div>

              <ChatArea />
            </div>
          </>
        ) : (
          <div className="w-3/4 h-full flex flex-col justify-between font-epilogue">
            <div className="flex flex-col items-center justify-center flex-grow text-center">
              <p>No request selected</p>
            </div>
            <div className="flex mb-5 mx-5">
              <input type="text" className="border-2 w-full mr-2 p-1" />
              <button className="hover:bg-[#2fab5e] bg-[#32bf68] transition-colors duration-200 ease-in-out text-white w-fit py-1 px-2">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectionsBeneficiary;
