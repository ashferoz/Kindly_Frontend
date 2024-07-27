import React, { useContext, useState } from "react";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import UpdateRequestModal from "../components/UpdateRequestModal";
import UserRequestCard from "../components/UserRequestCard";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectRequest, setSelectRequest] = useState(null);

  const {
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
    isFetching: userIsFetching,
    data: userData,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () =>
      await usingFetch(
        "/users/profile",
        "POST",
        {
          uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
  });

  const {
    isSuccess: requestIsSuccess,
    isError: requestIsError,
    error: requestError,
    isFetching: requestIsFetching,
    data: requestData,
  } = useQuery({
    queryKey: ["userRequests"],
    queryFn: async () =>
      await usingFetch(
        "/api/requests/id",
        "POST",
        {
          user_uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
  });

  const handleCardClick = (request) => {
    setSelectRequest(request);
    console.log(request);
    setShowUpdateModal(true);
  };

  return (
    <div>
      {showUpdateModal && (
        <UpdateRequestModal
          request={selectRequest}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
      {userIsSuccess &&
        userData.map((item) => {
          return (
            <div key={item.uuid} className="pl-20 pt-10 pr-20 pb-5">
              <h1 className="text-4xl mb-5">Hello, {item.username}!</h1>
              <p className="bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl font-epilogue mb-5">
                {item.location_id}
              </p>
            </div>
          );
        })}
      <h2 className="text-2xl pl-20 pb-10">Open requests</h2>
      <div className="w-full mx-auto pb-20 px-32 flex flex-wrap gap-10 justify-start">
        {requestIsSuccess &&
          requestData.map((item) => {
            return (
              <UserRequestCard
                key={item.request_id}
                id={item.request_id}
                title={item.title}
                category={item.request_category}
                urgency={item.request_urgency}
                location={item.request_location}
                status={item.request_status}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
        {requestIsFetching && <h1>Loading...</h1>}

        {requestIsError && <div>{requestError.message}</div>}
      </div>
      <h2 className="text-2xl pl-20 pb-10">Closed requests</h2>

      {userIsFetching && <h1>Loading...</h1>}
      {userIsError && <div>{userError.message}</div>}
    </div>
  );
};

export default Profile;
