import React from 'react';

const Login = () => {
    return (
        <div className="flex items-center justify-center text-center min-h-screen bg-[#ffc0cc] font-epilogue">
            <div className="flex flex-col w-96">
            <h1 className="text-3xl font-bold font-fraunces mb-5">Login</h1>
            <input type="text" placeholder="Email" className=" h-10 pl-3 mb-3" />
            <input type="password" placeholder="Password" className=" h-10 pl-3 mb-5" />
            <button className="bg-[#0753d8] text-white w-auto text-s h-9 rounded-lg hover:bg-[#eb5353] active:bg-[#a54040] transition-colors duration-150 ease-in-out">
          Login
        </button>
            </div>
        </div>
    );
};

export default Login;