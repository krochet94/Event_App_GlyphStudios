import React, { useState, useEffect } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { newUser, clearErrors } from "../../utils/actions";

const NewUser = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error, success } = useSelector((state) => state.newUser);
  const NEW_USER_RESET = "NEW_USER_RESET";

  const submitHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    dispatch(newUser(formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/users");
      alert.success("User added successfully");
      dispatch({ type: NEW_USER_RESET });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, success]);

  return (
    <div className="row container border border-dark mx-auto mt-5">
      <form
        encType="multipart/form-data"
        onSubmit={submitHandler}
        className="w-auto p-3 m-auto col-12"
      >
        <h1 className="mb-4">New User</h1>

        <div className="w-100 p-1">
          <label htmlFor="name_field" className="mt-1 h3">
            Name
          </label>
          <input
            type="text"
            id="name_field"
            className="w-100 p-2 h5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-100 p-1">
          <label htmlFor="email_field" className="mt-1 h3">
            Email
          </label>
          <input
            type="email"
            id="email_field"
            className="w-100 p-2 h5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary w-100 py-3"
            disabled={loading ? true : false}
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
