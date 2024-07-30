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
    
  const completeCount =
    data?.filter((item) => item.status === "COMPLETE").length || 0;

  const handleCardClick = (request) => {
    setSelectRequest(request);
    console.log(request);
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
      <div className="bg-[#6a994e] py-10 mt-14">
        {userCtx.role === "BENEFICIARY" ? null : (
          <>
            <RequestCounter count={completeCount} />

            <h3 className="font-epilogue text-4xl text-[#f2e8cf] text-center py-5 font-light italic">
              Give and receive help in your community.
            </h3>
          </>
        )}

        <div className="font-epilogue flex justify-center space-x-20">
          {userCtx.role === "BENEFICIARY" ? (
            <>
              <button
                onClick={() => navigate("/requestFrom")}
                className="bg-[#386641] text-white rounded-lg px-4 py-1 font-medium text-xl hover:bg-[#467c51] active:bg-[#3c6c46] transition-colors duration-150 ease-in-out"
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
      <div className="bg-[#fff7e1] w-full mx-auto py-20 px-32 flex flex-wrap gap-10 justify-start">
        {isSuccess &&
          openRequests.map((item) => (
            <RequestCard
              key={item.id}
              title={item.title}
              category={item.category}
              urgency={item.urgency}
              location={item.location}
              username={item.username}
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
