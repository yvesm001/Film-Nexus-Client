import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    loginInfo: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login(loginInfo);
      }}
    >
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card"
                style={{ backgroundColor: "#c6c6c6", borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class=" mb-5">Please enter your login and password!</p>

                    <div
                      data-mdb-input-init
                      class="form-outline form-white mb-4"
                    >
                      <input
                        type="email"
                        id="typeEmailX"
                        class="form-control form-control-lg"
                        name="loginInfo"
                        value={loginInfo.loginInfo}
                        onChange={handleChange}
                      />
                      <label class="form-label" for="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      class="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                        name="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                      />
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      class="btn btn-success btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  <div>
                    <p class="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" class=" fw-bold text-body">
                        Sign Up
                      </Link>

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

export default LoginForm;
