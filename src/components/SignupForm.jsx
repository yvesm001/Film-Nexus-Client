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
              <div className="card" style={{ borderRadius: "15px" }}>
                <div
                  className="card-body p-5"
                  style={{ backgroundColor: "#c6c6c6", borderRadius: "15px" }}
                >
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="username"
                        value={signupInfo.username}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Username
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        value={signupInfo.email}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="password"
                        value={signupInfo.password}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                        name="repeatPassword"
                        value={signupInfo.repeatPassword}
                        onChange={handleChange}
                      />
                      <label className="form-label" for="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>

                    {!passwordsMatch && <p>Passwords do not match</p>}

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block btn-lg text-white"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
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
