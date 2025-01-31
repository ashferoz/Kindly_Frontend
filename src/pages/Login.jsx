import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const { mutate, isError, error, data } = useMutation({
    mutationFn: async () =>
      await usingFetch("/auth/login", "POST", { username, password }),
    onSuccess: (data) => {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
      userCtx.setUserUUID(decoded.uuid);
      navigate("/main");
    },
    onError: (error) => {
      setSubmitError("Username or password don't match.");
    },
  });

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#ffdee4] font-epilogue">
      <div className="flex flex-col w-96">
        <h1 className="text-3xl font-bold font-fraunces mb-5">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" h-10 pl-3 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" h-10 pl-3 mb-5"
        />

        {submitError && <p className="text-[#eb5353] mb-3">{submitError}</p>}

        <button
          onClick={mutate}
          className="hover:bg-[#4d7aff] bg-[#0753d8] transition-colors duration-200 ease-in-out text-white w-auto text-s h-9 rounded-lg mb-5"
        >
          Login
        </button>
        <p className="font-light">
          Don't have an account yet?{" "}
          <a className="italic font-normal underline" href="/register">
            Register with us!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
