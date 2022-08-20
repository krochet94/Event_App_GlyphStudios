import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "../../style.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getUsers,
  getEvent,
  updateEvent,
  deleteEvent,
  clearErrors,
} from "../../utils/actions";

const Event = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [attendies, setAttendies] = useState([]);
  const { loading, error, success, event } = useSelector(
    (state) => state.getEvent
  );
  const { users } = useSelector((state) => state.users);
  const EVENT_DETAILS_RESET = "EVENT_DETAILS_RESET";

  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    /* update event values */
    dispatch(
      updateEvent(
        JSON.stringify({
          ...event,
          title: title,
          timeStart: start,
          timeEnd: end,
          taggedUsers: [...attendies],
        }),
        id
      )
    );
    setShowUpdate(false);
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
    <>
      <div className="container">
        <Form
          onSubmit={submitHandler}
          className="p-lg-5 p-1"
          id="formUpdateEvent"
        >
          <Form.Label className="mb-4 h3">
            Event: {event && event._id}
          </Form.Label>

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
            <Form.Label className="mt-1 h5">
              Time Start
              <br />(
              {event &&
                event.timeStart &&
                new Date(event.timeStart).toLocaleString()}
              )
            </Form.Label>
            <Form.Control
              type="datetime-local"
              className="w-100 p-2 h6"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />

            <Form.Group className="w-100 p-1">
              <Form.Label className="mt-1 h5">
                Time End
                <br />(
                {event &&
                  event.timeEnd &&
                  new Date(event.timeEnd).toLocaleString()}
                )
              </Form.Label>
              <Form.Control
                type="datetime-local"
                className="w-100 p-2 h6"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Form.Group>

            <Form.Label className="mt-3 mb-1 h5">
              Previous Attendies:
            </Form.Label>
            <Form.Group className="w-100 p-1">
              <Form.Text className="mb-2">
                {
                  /*previous attendies list*/
                  event &&
                    event.taggedUsers &&
                    event.taggedUsers.map((x) =>
                      users
                        .filter((user) => user._id === x)
                        .map((z) => `${z.name}, `)
                    )
                }
              </Form.Text>

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
                {users &&
                  users.map((user) => (
                    <option value={user._id}>{user.name}</option>
                  ))}
              </Form.Control>

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

            <Button
              variant="primary"
              className="w-100 py-3 my-3"
              disabled={loading ? true : false}
              onClick={() => {
                /* validate null inputs */
                title && start && end && attendies
                  ? setShowUpdate(true)
                  : alert.error("Please input valid values");
              }}
            >
              UPDATE
            </Button>

            <Button
              variant="danger"
              className="w-100 py-3"
              onClick={() => setShowDelete(true)}
            >
              DELETE
            </Button>

            <Button
              variant="secondary"
              className="w-100 py-3 my-3"
              onClick={() => window.close()}
            >
              CLOSE
            </Button>
          </Form.Group>
        </Form>
      </div>

      {
        /* for delete function and modal */

        showDelete && (
          <Modal show={showDelete} onHide={() => setShowDelete(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Delete {event && event.title} event?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={async () => {
                  await dispatch(deleteEvent(id));
                  setShowDelete(false);
                  window.close();
                }}
              >
                Delete
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDelete(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )
      }

      {
        /* for update function and modal */

        showUpdate && (
          <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Update {event && event.title} event?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" form="formUpdateEvent" type="submit">
                Update
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowUpdate(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )
      }
    </>
  );
};

export default Event;
