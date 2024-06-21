import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const { signup } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => {
      const newSignupInfo = { ...prev, [name]: value };

      // Check if passwords match
      if (name === "password" || name === "repeatPassword") {
        setPasswordsMatch(
          newSignupInfo.password === newSignupInfo.repeatPassword
        );
      }

      return newSignupInfo;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      return;
    }
    signup(signupInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <label htmlFor="repeatPassword">repeat password</label>
      <input
        type="password"
        name="repeatPassword"
        value={signupInfo.repeatPassword}
        onChange={handleChange}
      />

      {!passwordsMatch && <p>Passwords do not match</p>}

      <button type="submit">sign up</button>
    </form>
  );
}
