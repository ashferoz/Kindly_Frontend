import React from "react";
import FormBtn from "./FormBtn";

const Register = () => {
  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#ffc0cc] font-epilogue">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold font-fraunces mb-3">Register</h1>
        <h2 className="text-sm mb-5">
          Please provide all required details to register with us.
        </h2>
        <p className="text-left mx-5 mb-1">
          Name<span className="text-[#eb5353]">&#42;</span>
        </p>
        <div className="flex gap-5 mx-5 mb-5">
          <input type="text" placeholder="First" className="w-60 h-10 pl-3" />
          <input type="text" placeholder="Last" className="w-60 h-10 pl-3" />
        </div>
        <p className="text-left mx-5 mb-1">
          Email<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input className="w-auto mx-5 mb-5 h-10 pl-3" type="text" />
        <p className="text-left mx-5 mb-1">
          Password<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input className="w-auto mx-5 mb-5 h-10 pl-3" type="password" />
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
                value="volunteer"
                checked
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
                value="beneficiary"
              />
              <label className="ml-2" htmlFor="beneficiary">
                Beneficiary
              </label>
            </div>
          </div>
        </div>
        <p className="text-left mx-5 mb-1">Bio</p>
        <input className="w-auto mx-5 mb-5 h-10 pl-3" type="text" />
        <p className="text-left mx-5 mb-1">Location</p>
        <input className="w-auto mx-5 mb-5 h-10 pl-3" type="text" />
        <button className="bg-[#0753d8] text-white w-auto mx-5 text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
