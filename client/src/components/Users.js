import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import Loader from "./Loader";
import { getUsers } from "../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {BsPencilSquare, BsTrash} from "react-icons/bs"

const Users = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getUsers());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (<>
        <div className="container row mb-5">
          {users.map((data) => (
            <div className="col-6 col-md-4 col-lg-3 mt-1 p-4 text-center">
              <h5 className="mb-3 mx-auto ">Name: {data.name}</h5>
              <h5 className="mb-3 mx-auto">Email: {data.email}</h5>
              <h4 className="d-inline-block"><BsPencilSquare className="me-2"/><BsTrash/></h4>

            </div>
          ))}
        </div>
        </>
      )}
    </>
  );
};

export default Users;
