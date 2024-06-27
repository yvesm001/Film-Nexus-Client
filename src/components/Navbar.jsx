import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/NexsusLogo.png";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Film Nexsus
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/search">
                  Search
                </NavLink>
              </li>

              {user && user.isAdmin ? (
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/movie/create">
                    Add Movie
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My List
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/favorites">
                        Favorites
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/watchlist">
                        Watchlist
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>

            {/* LOGIN/SIGNUP AND LOGOUT BUTTONS */}
            {user ? (
              <button onClick={logout} className="btn btn-outline-success">
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-success text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline-success text-white"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
