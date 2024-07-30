import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConnectionSideBarCard from "../components/ConnectionSideBarCard";

const ConnectionsBeneficiary = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [selectRequest, setSelectRequest] = useState(null);
  const queryClient = useQueryClient()

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

  console.log(requestConnectData)

  const { mutate : update } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/requests/" + selectRequest.requestId,
        "PATCH",
        { status: "OPEN" },
        userCtx.accessToken
      ),
    onSuccess: () => {
      setSelectRequest(prev => ({
        ...prev,
        status: "OPEN",
      }));
      queryClient.invalidateQueries(["requestConnections"])
    },
  });

  const { mutate : remove } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/api/connection/" + selectRequest.requestId,
        "DELETE",
        undefined,
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["requestConnections"]);
    },
  });


  const handleButton = () => {
    if (selectRequest) {
      update();
      // remove();
    }
  }

  console.log(selectRequest)

  return (
    <>
      <div className="bg-[#fff7e1] h-[90vh] w-[100vw] text-[#352a1f] mt-14 flex flex-wrap justify-center">
        <div className="w-1/4 h-full">
          {requestConnectIsSuccess &&
            requestConnectData.map((item) => {
              return (
                <ConnectionSideBarCard
                  key={item.id}
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

        <div className="w-3/5 h-full flex flex-col justify-between font-epilogue">
          {selectRequest && (
            <div className="p-5">
              <h4>Username: {selectRequest.usernameVolunteer}</h4>
              <div className="flex">
                <h5 className="mr-5">Bio: {selectRequest.bio}</h5>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-end px-1 bg-white">
            {selectRequest && selectRequest.status === "ONGOING" && (
              <button onClick={ handleButton } className="bg-[#8cb369] my-1">
                Decline offer
              </button>
            )}

            {selectRequest && selectRequest.status === "COMPLETE" && (
              <p>This request is closed. Delete  if no longer needed.</p>
            )}

            <button onClick={ remove } className="bg-[#8cb369] my-1">Delete Connection</button>
            <div className="flex">
              <input type="text" className="border-2 w-full mr-2" />
              <button className="bg-[#8cb369] px-2">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionsBeneficiary;
