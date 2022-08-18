const express = require("express");
const router = express.Router();

const {
  newEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.route("/event").post(newEvent);
router.route("/events").get(getEvents);
router.route("/event/:id").get(getEvent).put(updateEvent).delete(deleteEvent);

module.exports = router;
