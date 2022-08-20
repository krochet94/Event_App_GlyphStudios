import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
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
  const [attendies, setAttendies] = useState();
  const { loading, error, success } = useSelector((state) => state.newEvent);
  const { users } = useSelector((state) => state.users);
  const NEW_EVENT_RESET = "NEW_EVENT_RESET";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      newEvent(
        JSON.stringify({
          title: title,
          timeStart: start,
          timeEnd: end,
          taggedUsers: [...attendies],
        })
      )
    );
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
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, success]);

  return (
    <div className="container">
      <Form onSubmit={submitHandler} className="p-lg-5 p-1">
        <Form.Label className="mb-4 h3">New Event</Form.Label>

        <Form.Group className="w-100 p-1">
          <Form.Group className="mt-1 h5">Title</Form.Group>
          <Form.Control
            type="text"
            className="w-100 p-2 h6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="w-100 p-1">
          <Form.Label className="mt-1 h5">Time Start</Form.Label>
          <Form.Control
            type="datetime-local"
            className="w-100 p-2 h6"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <Form.Group className="w-100 p-1">
            <Form.Label className="mt-1 h5">Time End</Form.Label>
            <Form.Control
              type="datetime-local"
              className="w-100 p-2 h6"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="w-100 p-1">
            <Form.Label className="my-3 h5">
              Attendies
              <br />
            </Form.Label>
            <Form.Control
              as="select"
              className="w-100 p-2 h6"
              multiple
              id="attendies_field"
              value={attendies}
              //onchange handler
              onChange={(e) => {
                setAttendies(
                  [].slice
                    .call(e.target.selectedOptions)
                    .map((item) => item.value)
                );
              }}
            >
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>

            {/* <Form.Text>{attendies.map(x=>`${x} `)}</Form.Text> */}
            {/* showing the names selected so far*/}
            <Form.Text>
              &#8203; {/* invisible character to take up space*/}
              {attendies &&
                attendies.map((x) =>
                  users
                    .filter((user) => user._id === x)
                    .map((z) => `${z.name}, `)
                )}{" "}
              {attendies && attendies.length > 10 && (
                <i className="text-danger">{`==> more than 10 attendies already`}</i>
              )}
            </Form.Text>
          </Form.Group>

          <button
            type="submit"
            className="btn btn-primary w-100 py-3 my-3"
            disabled={loading ? true : false}
          >
            CREATE
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewEvent;
