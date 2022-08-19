import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../../style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getUsers, getEvent, clearErrors } from "../../utils/actions";

const Event = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [attendies, setAttendies] = useState([]);
  const { loading, error, success, event } = useSelector((state) => state.getEvent);
  const { users } = useSelector((state) => state.users);
  const EVENT_DETAILS_RESET = "EVENT_DETAILS_RESET";

  
  const submitHandler = (e) => {
    e.preventDefault();
    /* dispatch(
      newEvent(
        JSON.stringify({
          title: title,
          timeStart: start,
          timeEnd: end,
          taggedUsers: [...attendies],
        })
      )
    ); */
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Event added successfully");
      dispatch({ type: EVENT_DETAILS_RESET });
    }
    dispatch(getEvent(id));
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, alert, error, success]);

  return (
    <div className="container">
      <Form onSubmit={submitHandler} className="p-lg-5 p-1">
        <Form.Label className="mb-4 h3">Event: {event && event._id}</Form.Label>

        <Form.Group className="w-100 p-1">
          <Form.Group className="mt-1 h5">Title</Form.Group>
          <Form.Control
            type="text"
            className="w-100 p-2 h6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={event && event.title}
          />
        </Form.Group>

        <Form.Group className="w-100 p-1">
          <Form.Label className="mt-1 h5">Time Start ({event && new Date(event.timeStart).toLocaleString()})</Form.Label>
          <Form.Control
            type="datetime-local"
            className="w-100 p-2 h6"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <Form.Group className="w-100 p-1">
            <Form.Label className="mt-1 h5">Time End ({event && new Date(event.timeEnd).toLocaleString()})</Form.Label>
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
                <option value={user._id}>{user.name}</option>
              ))}
            </Form.Control>

            {/* <Form.Text>{attendies.map(x=>`${x} `)}</Form.Text> */}
            {/* showing the names selected so far*/}
            <Form.Text>
              {attendies.map((x) =>
                users.filter((user) => (user.id === x ? `[${user.name}] ` : ""))
              )}
            </Form.Text>
          </Form.Group>

          <button
            className="btn btn-primary w-100 py-3 my-3"
            disabled={loading ? true : false}
            onClick={()=>window.close()}
          >
            CREATE
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Event;
