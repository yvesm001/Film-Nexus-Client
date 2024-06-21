import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    setSignupInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signup(signupInfo);
      }}
    >
      <label htmlFor="email">email</label>
      <input
        type="email"
        name="email"
        value={signupInfo.email}
        onChange={handleChange}
      />

      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        value={signupInfo.username}
        onChange={handleChange}
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        value={signupInfo.password}
        onChange={handleChange}
      />
      <button type="submit">sign up</button>
    </form>
  );
}
