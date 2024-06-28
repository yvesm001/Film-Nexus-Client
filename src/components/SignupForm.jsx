import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const { signup } = useContext(AuthContext);
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="review-form">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Username
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="username"
                        value={signupInfo.username}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        value={signupInfo.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="password"
                        value={signupInfo.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        name="repeatPassword"
                        value={signupInfo.repeatPassword}
                        onChange={handleChange}
                      />
                    </div>

                    {!passwordsMatch && <p>Passwords do not match</p>}

                    <div className="d-flex justify-content-center">
                      <button type="submit">Register</button>
                    </div>

                    <p className="text-center mt-5 mb-0">
                      Already have an account?{" "}
                      <Link to="/login" className="fw-bold ">
                        <u>Login</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
