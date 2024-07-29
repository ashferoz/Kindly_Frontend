import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";
import { useQuery } from "@tanstack/react-query";
import ConnectionSideBarCard from "../components/ConnectionSideBarCard";

const Connections = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [selectRequest, setSelectRequest] = useState(null);
  const [showRequestCard, setShowRequestCard] = useState(null);

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
        "/api/requests/connected",
        "POST",
        {
          volunteer_uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
  });

  const handleCollectionBtn = (request) => {
    setSelectRequest(request);
    console.log(request);
    setShowRequestCard(true);
  };

  console.log(selectRequest);

  return (
    <>
      <div className="bg-[#fff7e1] h-[90vh] w-[100vw] text-[#352a1f]  flex flex-wrap justify-center">
        <div className="w-1/4 h-full">
          {requestConnectIsSuccess &&
            requestConnectData.map((item) => {
              return (
                <ConnectionSideBarCard
                  key={item.connection_id}
                  requestId={item.request_id}
                  title={item.title}
                  details={item.details}
                  category={item.request_category}
                  urgency={item.request_urgency}
                  location={item.request_location}
                  status={item.request_status}
                  username={item.beneficiary_username}
                  setSelectRequest = {setSelectRequest}
                />
              );
            })}
        </div>

        <div className="w-3/5 h-full flex flex-col justify-between font-epilogue">
          {selectRequest && (
            <div className="p-5">
              <h4>{selectRequest.username}</h4>
              <h5>Title: {selectRequest.title}</h5>
              <h5>Details: {selectRequest.details} </h5>
              <div className="flex">
                <h5 className="mr-5">{selectRequest.category}</h5>
                <h5 className="mx-5">{selectRequest.location}</h5>
                <h5 className="mx-5">{selectRequest.urgency}</h5>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-end px-1 bg-white">
            <button className="bg-[#8cb369] my-1">Accept Request</button>
            <button className="bg-[#8cb369] my-1">Delete Connection</button>
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

export default Connections;
