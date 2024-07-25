import React from "react";
import FormBtn from "./FormBtn";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#ffc0cc]">
      <div>
        <h1 className="text-5xl mb-8">Welcome to Kindly!</h1>
        <p className="font-epilogue font-light">
          Connect with volunteers and find the help you need or lend a hand to
          those in your community. <br />
          Together, let's build a network of kindness and support.
        </p>
        <div className="font-epilogue flex justify-center space-x-20 mt-10">
          <FormBtn>Register</FormBtn>
          <FormBtn>Login</FormBtn>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
