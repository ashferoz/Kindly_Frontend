import React from "react";
import RequestCard from "../components/RequestCard";
import useFetch from "../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const usingFetch = useFetch();

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await usingFetch("/api/requests", undefined, undefined, undefined),
  });

  return (
    <div>
      <div className="pl-20 pt-20 pr-20 pb-10">
        <h1 className="text-4xl mb-5">Hello, username!</h1>
        <p className="bg-[#ffc0cc] w-auto inline-block mx-2 px-3 py-1 rounded-3xl font-epilogue mb-5">
          location
        </p>
        <h2 className="text-2xl">Your requests</h2>
      </div>
      <div className="w-full mx-auto pb-20 px-32 flex flex-wrap gap-10 justify-start">
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

export default Profile;
