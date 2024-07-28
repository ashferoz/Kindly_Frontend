import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../contexts/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetch("/auth/login", "POST", {
          username,
          hashed_password: password,
        });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
      userCtx.setUserUUID(decoded.uuid); 
      navigate("/profile");
      console.log(data)
    }
  }, [data]);
  

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#ffc0cc] font-epilogue">
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
        <button
          onClick={refetch}
          className="bg-[#0753d8] text-white w-auto text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out mb-5"
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
