import React, { useState } from "react";
import FormBtn from "../components/FormBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const usingFetch = useFetch();
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: async () => {
      usingFetch(
        "/auth/register",
        "PUT",
        {
          firstname,
          lastname,
          email,
          username,
          hashed_password: password,
          role_id: selectedRole,
          bio,
          location_id: location,
        },
        undefined
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"])
      navigate('/login')
    },
  });

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#ffc0cc] font-epilogue">
      <div className="flex flex-col mb-10">
        <h1 className="text-3xl font-bold font-fraunces mb-3">Register</h1>
        <h2 className="text-sm mb-5">
          Please provide all required details to register with us.
        </h2>
        <p className="text-left mx-5 mb-1">
          Name<span className="text-[#eb5353]">&#42;</span>
        </p>
        <div className="flex gap-5 mx-5 mb-5">
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            placeholder="First"
            className="w-60 h-10 pl-3"
          />
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            type="text"
            placeholder="Last"
            className="w-60 h-10 pl-3"
          />
        </div>
        <p className="text-left mx-5 mb-1">
          Email<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="email"
        />
        <p className="text-left mx-5 mb-1">
          Username<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="text"
        />
        <p className="text-left mx-5 mb-1">
          Password<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="password"
        />
        <p className="text-left mx-5 mb-1">
          Role<span className="text-[#eb5353]">&#42;</span>
        </p>
        <div className="mb-5">
          <div className="w-auto flex justify-around">
            <div>
              <input
                type="radio"
                id="volunteer"
                name="role"
                value="VOLUNTEER"
                checked={selectedRole === "VOLUNTEER"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <label className="ml-2" htmlFor="volunteer">
                Volunteer
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="beneficiary"
                name="role"
                value="BENEFICIARY"
                checked={selectedRole === "BENEFICIARY"}
                onChange={(e) => setSelectedRole(e.target.value)}
              />
              <label className="ml-2" htmlFor="beneficiary">
                Beneficiary
              </label>
            </div>
          </div>
        </div>
        <p className="text-left mx-5 mb-1">Bio</p>
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="text"
        />
        <p className="text-left mx-5 mb-1">Location</p>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="text"
        />
        <button
          onClick={mutate}
          className="bg-[#0753d8] text-white w-auto mx-5 text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out mb-8"
        >
          Register
        </button>
        <a className="italic font-normal underline" href="/login">
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default Register;
