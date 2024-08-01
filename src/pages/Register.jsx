import React, { useState } from "react";
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
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    selectedRole: "",
  });
  const usingFetch = useFetch();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      const registerUser = {
        first_name: firstname,
        last_name: lastname,
        email,
        username,
        password,
        role: selectedRole,
      };

      if (selectedRole === "VOLUNTEER") {
        registerUser.bio = bio;
      }

      return await usingFetch("/auth/register", "PUT", registerUser, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      navigate("/login");
    },
  });

  const validate = () => {
    const newErrors = { ...errors };
    let isValid = true;

    if (!firstname) {
      newErrors.firstname = "First name is required";
      isValid = false;
    } else {
      newErrors.firstname = "";
    }

    if (!lastname) {
      newErrors.lastname = "Last name is required";
      isValid = false;
    } else {
      newErrors.lastname = "";
    }

    if (!email.includes('@')) {
      newErrors.email = "Email needs to be valid";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else {
      newErrors.username = "";
    }

    if (password.length < 8) {
      newErrors.password = "Password needs to be longer than 8 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (!selectedRole) {
      newErrors.selectedRole = "Role is required";
      isValid = false;
    } else {
      newErrors.selectedRole = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitBtn = () => {
    if (validate()) {
      mutate();
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen pt-20 bg-[#ffdee4] font-epilogue text-[#373737]">
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
        {errors.firstname && (
          <p className="text-[#eb5353] mb-1">{errors.firstname}</p>
        )}
        {errors.lastname && (
          <p className="text-[#eb5353] mb-1">{errors.lastname}</p>
        )}
        <p className="text-left mx-5 mb-1">
          Email<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="email"
        />
        {errors.email && <p className="text-[#eb5353] mb-5">{errors.email}</p>}

        <p className="text-left mx-5 mb-1">
          Username<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="text"
        />
        {errors.username && <p className="text-[#eb5353] mb-5">{errors.username}</p>}

        <p className="text-left mx-5 mb-1">
          Password<span className="text-[#eb5353]">&#42;</span>
        </p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
          type="password"
        />
        {errors.password && <p className="text-[#eb5353] mb-5">{errors.password}</p>}

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-auto mx-5 mb-5 h-10 pl-3"
        >
          <option value="" disabled>
            Select role
          </option>
          <option value="BENEFICIARY">beneficiary</option>
          <option value="VOLUNTEER">volunteer</option>
        </select>
        {errors.selectedRole && <p className="text-[#eb5353] mb-5">{errors.selectedRole}</p>}

        <button
          onClick={handleSubmitBtn}
          className="hover:bg-[#4d7aff] bg-[#0753d8] text-white w-auto mx-5 text-s h-9 rounded-lg transition-colors duration-200 ease-in-out mb-8"
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
