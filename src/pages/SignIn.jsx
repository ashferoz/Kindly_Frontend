import React from "react";
import FormBtn from "../components/FormBtn";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#ffdee4] text-[#0753d8] font-epilogue ">
      <div>
        <h1 className="text-5xl mb-8 font-fraunces">Welcome to Kindly!</h1>
        <p className="font-light text-l">
          Connect with volunteers and find the help you need or lend a hand to
          those in your community. <br />
          Together, let's build a network of kindness and support.
        </p>
        <div className="flex justify-center space-x-20 mt-10">
          <FormBtn onClick={() => navigate('/register')}>Register</FormBtn>
          <FormBtn onClick={() => navigate('/login')}>Login</FormBtn>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
