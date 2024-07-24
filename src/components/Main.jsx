import React from "react";
import RequestCounter from "./RequestCounter";
import FormBtn from "./FormBtn";
import RequestCard from "./RequestCard";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const Main = () => {
  const usingFetch = useFetch();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["requests"],
    queryFn: async () =>
      await usingFetch("/api/requests", undefined, undefined, undefined),
  });
  return (
    <div>
      <div className="bg-[#ffc0cc] py-10">
        <RequestCounter />
        <h3 className="font-epilogue text-4xl text-[#0753d8] text-center py-10 font-light italic">
          Give and receive help in your community.
        </h3>
        <div className="font-epilogue flex justify-center space-x-20">
          <FormBtn>Want to help?</FormBtn>
          <FormBtn>Need help?</FormBtn>
        </div>
      </div>
      <div className="w-full px-10 py-20 flex flex-wrap gap-10 justify-center">
        {isSuccess &&
          data.map((item) => {
            return (
              <RequestCard
                key={item.request_id}
                title={item.title}
                category={item.request_category}
                username={item.username}
                className=""
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
