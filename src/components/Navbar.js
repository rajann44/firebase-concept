import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            id="navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"/signup"}
                >
                  Signup Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/customers"}>
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Customer Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Register (Create)
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/user"}>
                  User (Read)
                </Link>
              </li>
            </ul>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
