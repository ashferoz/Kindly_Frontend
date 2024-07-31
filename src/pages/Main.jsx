import React, { useContext, useState } from "react";
import RequestCounter from "../components/RequestCounter";
import FormBtn from "../components/FormBtn";
import RequestCard from "../components/RequestCard";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import RequestModal from "../components/RequestModal";
import UserContext from "../contexts/user";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectRequest, setSelectRequest] = useState(null);

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["requests"],
    queryFn: async () =>
      await usingFetch("/api/requests", "GET", undefined, undefined),
  });

  const openRequests =
    data?.filter(
      (item) => item.status === "OPEN" || item.status === "ONGOING"
    ) || [];

  const sortedOpenRequests = [...openRequests].sort((a, b) => {
    const dateA = new Date(a.date_created);
    const dateB = new Date(b.date_created);
    return dateB - dateA;
  });

  const completeCount =
    data?.filter((item) => item.status === "COMPLETE").length || 0;

  const handleCardClick = (request) => {
    setSelectRequest(request);
    setShowRequestModal(true);
  };

  return (
    <div>
      {showRequestModal && (
        <RequestModal
          request={selectRequest}
          setShowRequestModal={setShowRequestModal}
        />
      )}
      <div className="bg-[#d1b9e5] py-10 mt-14 text-[#0753d8]">
        {userCtx.role === "BENEFICIARY" ? null : (
          <>
            <RequestCounter count={completeCount} />

            <h3 className="font-epilogue text-4xl text-center py-5 font-light">
              <span className="font-medium">Give</span> and{" "}
              <span className="font-medium">receive</span> help in your
              community.
            </h3>
          </>
        )}

        <div className="font-epilogue flex justify-center space-x-20">
          {userCtx.role === "BENEFICIARY" ? (
            <>
              <button
                onClick={() => navigate("/requestFrom")}
                className="bg-[#32bf68] text-white w-40 text-xl h-9 rounded-xl hover:bg-[#2fab5e] transition-colors duration-300 ease-in-out"
              >
                Post a request
              </button>
            </>
          ) : null}

          {!userCtx.accessToken && (
            <>
              <FormBtn onClick={() => navigate("/register")}>Register</FormBtn>
              <FormBtn onClick={() => navigate("/login")}>Login</FormBtn>
            </>
          )}
        </div>
      </div>
      <div className="bg-[#fffae1] w-full mx-auto py-20 px-32 flex flex-wrap gap-10 justify-start">
        {isSuccess &&
          sortedOpenRequests.map((item) => (
            <RequestCard
              key={item.id}
              title={item.title}
              category={item.category}
              urgency={item.urgency}
              location={item.location}
              username={item.username}
              beneficiary_uuid={item.beneficiary_uuid}
              onClick={() => handleCardClick(item)}
            />
          ))}
      </div>

      {isFetching && <h1>Loading...</h1>}
      {isError && <div>{error.message}</div>}
    </div>
  );
};

export default Main;
