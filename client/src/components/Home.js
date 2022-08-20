import React, { useEffect } from "react";
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

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, events , error } = useSelector((state) => state.events);

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
              eventClick={(info)=> window.open(`/event/${info.event.id}`,"_blank")}
              slotMinTime="08:00:00"
              slotMaxTime="21:00:00"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
