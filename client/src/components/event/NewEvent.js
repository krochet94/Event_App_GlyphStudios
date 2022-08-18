import React, { useState, useEffect } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { newEvent, getUsers, clearErrors } from "../../utils/actions";

const NewEvent = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { loading, error, success } = useSelector((state) => state.newEvent);
  const { users } = useSelector((state) => state.users);
  const NEW_EVENT_RESET = "NEW_EVENT_RESET";

  const submitHandler = (e) => {
    e.preventDefault();
    var formData = new FormData();/* 
    formData.set("name", name);
    formData.set("email", email); */
    dispatch(newEvent(formData));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/");
      alert.success("Event added successfully");
      dispatch({ type: NEW_EVENT_RESET });
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
        <h1 className="mb-4">New Event</h1>

        <div className="w-100 p-1">
          <label htmlFor="title_field" className="mt-1 h3">
            Title
          </label>
          <input
            type="text"
            id="title_field"
            className="w-100 p-2 h5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-100 p-1">
          <label htmlFor="date_start_field" className="mt-1 h3">
            Time Start
          </label>
          <input
            type="datetime-local"
            id="date_start_field"
            className="w-100 p-2 h5"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          
          <div className="w-100 p-1">
          <label htmlFor="date_end_field" className="mt-1 h3">
            Time End
          </label>
          <input
            type="datetime-local"
            id="date_end_field"
            className="w-100 p-2 h5"
            value={end}
            onChange={(e) => setEnd(e.target.value)}/>
            </div>

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

export default NewEvent;
