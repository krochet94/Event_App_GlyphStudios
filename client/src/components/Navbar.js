import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
      <div className="navbar row">
        <Link
          className="col-2 m-3 p-2 text-decoration-none btn btn-light"
          to={"/"}
        >
          <h6>Events</h6>
        </Link>
        <Link
          className="col-2 m-3 p-2 text-decoration-none btn btn-light"
          to={"/users"}
        >
          <h6>Users</h6>
        </Link>

        {/* changes the button depending on the page */
        location.pathname === "/" || location.pathname === "/newUser" ? (
          <div
            className="col-2 m-3 p-2 text-decoration-none btn btn-light"
            onClick={() => navigate("/newEvent")}
          >
            <h6>Create Event</h6>
          </div>
        ) : (
          <div
            className="col-2 m-3 p-2 text-decoration-none btn btn-light"
            onClick={() => navigate("/newUser")}
          >
            <h6>Create User</h6>
          </div>
        )}
      </div>
  );
};

export default Navbar;
