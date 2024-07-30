import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import UserContext from "../contexts/user";
import useFetch from "../hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Overlay = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [bio, setBio] = useState(props.bio);
  const userCtx = useContext(UserContext);
  const usingFetch = useFetch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await usingFetch(
        "/users/",
        "PATCH",
        {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          bio,
          uuid: userCtx.userUUID,
        },
        userCtx.accessToken
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      props.setShowUserUpdateModal(false)
    },
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000078] z-50 font-epilogue">
      <div className="w-[600px] h-auto bg-[#ffc0cc] font-epilogue relative">
        <button
          onClick={() => props.setShowUserUpdateModal(false)}
          className="absolute top-2 right-2 bg-[#0753d8] text-white rounded-lg px-2"
        >
          Cancel
        </button>
        <div className="flex flex-col p-8">
          <p className="text-left  mb-1">
            Name<span className="text-[#eb5353]">&#42;</span>
          </p>
          <div className="flex justify-between mb-5">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First"
              className="w-60 h-10 pl-3"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last"
              className="w-60 h-10 pl-3"
            />
          </div>

          <p className="text-left  mb-1">Username</p>
          <input
            className="w-auto  mb-5 h-10 pl-3"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="text-left  mb-1">Email</p>
          <input
            className="w-auto  mb-5 h-10 pl-3"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {userCtx.role === "VOLUNTEER" && (
            <>
              <p className="text-left  mb-1">Bio</p>
              <textarea
                className="w-auto mb-5 h-20 pl-3"
                rows="4"
                cols="50"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </>
          )}

          <button
            onClick={mutate}
            className="bg-[#0753d8] text-white w-auto text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateUserModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          firstName={props.firstName}
          lastName={props.lastName}
          username={props.username}
          email={props.email}
          password={props.password}
          bio={props.bio}
          setShowUserUpdateModal={props.setShowUserUpdateModal}
        />,
        document.querySelector("#root")
      )}
    </>
  );
};

export default UpdateUserModal;
