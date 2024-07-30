import React, { useContext, useState } from "react";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import UpdateRequestModal from "../components/UpdateRequestModal";
import UserRequestCard from "../components/UserRequestCard";
import { useNavigate } from "react-router-dom";
import RequestConnectedCard from "../components/RequestConnectedCard";
import UpdateUserModal from "../components/UpdateUserModal";

const Profile = () => {
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUserUpdateModal, setShowUserUpdateModal] = useState(false);
  const [selectRequest, setSelectRequest] = useState(null);
  const navigate = useNavigate();

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
          beneficiary_uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
  });

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
        "/api/connected/volunteer",
        "POST",
        {
          volunteer_uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
  });

  const handleCardClick = (request) => {
    setSelectRequest(request);
    setShowUpdateModal(true);
  };
  return (
    <div className="bg-[#fff7e1] h-full text-[#352a1f] mt-14">
      {showUpdateModal && (
        <UpdateRequestModal
          request={selectRequest}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}

      {userIsSuccess &&
        userData.map((item) => {
          return (
            <div key={item.uuid} className="ml-20 pt-10 pr-20 mb-7">
              {showUserUpdateModal && (
                <UpdateUserModal
                  firstName={item.first_name}
                  lastName={item.last_name}
                  username={item.username}
                  email={item.email}
                  password={item.password}
                  bio={item.bio}
                  setShowUserUpdateModal={setShowUserUpdateModal}
                />
              )}
              <button
                onClick={() => setShowUserUpdateModal(true)}
                className="bg-[#386641] text-white rounded-lg fixed right-5 top-14 px-4 py-1 mt-4 font-medium text-xl hover:bg-[#467c51] active:bg-[#3c6c46] transition-colors duration-150 ease-in-out"
              >
                Edit Profile
              </button>
              <div className="flex items-center">
                <h1 className="text-4xl">Hello, {item.username}!</h1>
                {userCtx.role === "BENEFICIARY" && (
                  <p className="bg-[#ffc0cc] h-auto w-auto mx-4 px-3 rounded-3xl font-epilogue">
                    {item.location_id}
                  </p>
                )}
              </div>
              {userCtx.role === "BENEFICIARY" ? (
                <>
                  <button
                    onClick={() => navigate("/requestFrom")}
                    className="bg-[#386641] text-white rounded-lg mr-5 px-4 py-1 mt-4 font-medium text-xl hover:bg-[#467c51] active:bg-[#3c6c46] transition-colors duration-150 ease-in-out"
                  >
                    Post a request
                  </button>
                  <h2 className="text-2xl mt-4">Open requests</h2>
                </>
              ) : (
                <>
                  <h2 className="text-2xl mt-4 font-epilogue">
                    Bio: {item.bio}{" "}
                    <span className="block text-sm italic">
                      (this will be shown to beneficiaries)
                    </span>
                  </h2>
                  <h2 className="text-2xl mt-4">Ongoing</h2>
                </>
              )}
            </div>
          );
        })}

      <div className="w-full mx-auto pb-20 px-32 flex flex-wrap gap-10 justify-start">
        {requestConnectIsSuccess &&
          requestConnectData.map((item) => {
            return (
              <RequestConnectedCard
                key={item.id}
                requestId={item.request_id}
                title={item.title}
                details={item.details}
                category={item.category}
                urgency={item.urgency}
                location={item.location}
                status={item.status}
                beneficiary_username={item.beneficiary_username}
              />
            );
          })}
        {requestConnectIsFetching && <h1>Loading...</h1>}

        {requestConnectIsError && <div>{requestConnectError.message}</div>}
      </div>

      <div className="w-full mx-auto pb-20 px-32 flex flex-wrap gap-10 justify-start">
        {requestIsSuccess &&
          requestData.map((item) => {
            return (
              <UserRequestCard
                key={item.id}
                id={item.id}
                title={item.title}
                details={item.details}
                category={item.category}
                urgency={item.urgency}
                location={item.location}
                status={item.status}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
        {requestIsFetching && <h1>Loading...</h1>}

        {requestIsError && <div>{requestError.message}</div>}
      </div>

      {userCtx.role === "BENEFICIARY" ? (
        <h2 className="text-2xl pl-20 pb-10">Completed requests</h2>
      ) : (
        <h2 className="text-2xl pl-20 pb-10">Requests you have helped with</h2>
      )}

      {userIsFetching && <h1>Loading...</h1>}
      {userIsError && <div>{userError.message}</div>}
    </div>
  );
};

export default Profile;
