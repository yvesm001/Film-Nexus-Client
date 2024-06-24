import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/NexsusLogo.png";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand"> Film Nexsus</NavLink>
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

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My List
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="favorite">
                      Favorite Movies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/watched">
                      Watched
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
            </ul>

            {/* CONDITIONALLY RENDERED BUTTON TO ADD NEW MOVIE IF LOGGED IN USER IS AN ADMIN */}
            <div>
              {user && user.isAdmin && (
                <Link to="/movie/create" className="btn btn-outline-success">
                  Add a new movie
                </Link>
              )}
            </div>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/* LOGIN/SIGNUP AND LOGOUT BUTTONS */}
            {user ? (
              <button onClick={logout} className="btn btn-outline-success">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-success">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline-success">
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
