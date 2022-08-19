import React, { useEffect, useState } from "react";
import "../style.css";
import Loader from "./Loader";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { getEvents } from "../utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Modal, Button, Form, Card } from "react-bootstrap";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, events, error } = useSelector((state) => state.events);
  const [target, setTarget] = useState();
  const [show, setShow] = useState(false);

  //modify the events object to accept by calendar plugin
  var allEvents = events.map((data) => {
    data.start = data.timeStart;
    data.end = data.timeEnd;
    data.id = data._id;
    delete data.timeStart;
    delete data.timeEnd;
    delete data._id;
    delete data.taggedUsers;
    delete data.__v;
    return data;
  });

  const submitEvent = () => {};

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getEvents());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <FullCalendar
              initialView="listMonth"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "listMonth,dayGridMonth,timeGridWeek",
              }}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interactionPlugin,
              ]}
              events={allEvents}
              //catching clicked event
              eventClick={(e) => {
                setTarget(events.filter((x) => x._id === e.event.id));
                setShow(true);
              }}
              slotMinTime="08:00:00"
              slotMaxTime="21:00:00"
            />
          </div>

          {
            /* modal element */

            show && (
              <Modal
                show={show}
                onHide={() => {
                  setTarget();
                  setShow(false);
                }}
              >
                <Modal.Body>
                  <Card className="p-lg-5 p-1">
                    <Card.Label className="mb-4 h3">Update User</Card.Label>

                    <Card.Group className="w-100 p-1">
                      <Card.Group className="mt-1 h5">Title</Card.Group>
                      <Card.Text className="w-100 p-2 h6">
                        {target.title}
                      </Card.Text>
                    </Card.Group>

                    <Card.Group className="w-100 p-1">
                      <Card.Group className="mt-1 h5">Starting Time</Card.Group>
                      <Card.Text className="w-100 p-2 h6">
                        {target.timeStart.toLocaleString()}
                      </Card.Text>
                    </Card.Group>

                    <Card.Group className="w-100 p-1">
                      <Card.Group className="mt-1 h5">Ending Time</Card.Group>
                      <Card.Text className="w-100 p-2 h6">
                        {target.timeEnd.toLocaleString()}
                      </Card.Text>
                    </Card.Group>

                    <Card.Group className="w-100 p-1">
                      <Card.Group className="mt-1 h5">Participants</Card.Group>
                      <Card.Text className="w-100 p-2 h6">
                        <ul className="list-unstyled">
                          {target.taggedUsers.map((x) => (
                            <li>{x}</li>
                          ))}
                        </ul>
                      </Card.Text>
                    </Card.Group>
                  </Card>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" form="formUpdate" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTarget();
                      setShow(false);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )
          }
        </>
      )}
    </>
  );
};

export default Home;
