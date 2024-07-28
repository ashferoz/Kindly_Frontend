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
      <div className="bg-[#ffc0cc] py-10">
        {userCtx.role === "BENEFICIARY" ? (
          
          <h1 className=" text-7xl text-black text-center py-10 font-bold italic">All Requests</h1>
        ) : (
          <>
            <RequestCounter />
            <h3 className="font-epilogue text-4xl text-black text-center py-10 font-light italic">
              Give and receive help in your community.
            </h3>
          </>
        )}

        <div className="font-epilogue flex justify-center space-x-20">
          {userCtx.role === "BENEFICIARY" ? (
            <>
              <button
                onClick={() => navigate("/requestFrom")}
                className="bg-[#0753d8] text-white rounded-lg px-2 font-medium text-xl "
              >
                Post a request
              </button>
            </>
          ) : (
            <>
              <FormBtn onClick={() => navigate("/register")}>Register</FormBtn>
              <FormBtn onClick={() => navigate("/login")}>Login</FormBtn>
            </>
          )}
        </div>
      </div>
      <div className="w-full mx-auto py-20 px-32 flex flex-wrap gap-10 justify-start">
        {isSuccess &&
          data.map((item) => {
            return (
              <RequestCard
                key={item.request_id}
                title={item.title}
                category={item.request_category}
                urgency={item.request_urgency}
                location={item.request_location}
                username={item.username}
                onClick={() => handleCardClick(item)}
              />
            );
          })}
      </div>

      {isFetching && <h1>Loading...</h1>}

      {isError && <div>{error.message}</div>}
    </div>
  );
};

export default Main;
