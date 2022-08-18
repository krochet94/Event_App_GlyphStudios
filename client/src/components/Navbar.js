import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
   return (
    <>
      <div className="navbar row">
        <Link
          className="col-2 m-3 p-2 text-decoration-none btn btn-light"
          to={"/"}
          onClick={()=>setHidden(true)}
        >
          <h6>Events</h6>
        </Link>
        <Link
          className="col-2 m-3 p-2 text-decoration-none btn btn-light"
          to={"/users"}
          onClick={()=>setHidden(false)}
        >
          <h6>Users</h6>
        </Link>
        {hidden ? (
          <div className="col-2 m-3 p-2 text-decoration-none btn btn-light" onClick={()=>navigate("/newEvent")}>
            <h6>Create Event</h6>
          </div>
        ) : (
          <div className="col-2 m-3 p-2 text-decoration-none btn btn-light" onClick={()=>navigate("/newUser")}>
            <h6>Create User</h6>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
