const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter Title"],
    trim: true,
    maxLength: [100, "Event name cannot exceed 100 characters"],
  },

  timeStart: {
    type: Date,
    required: true,
    validate: [
      (val) => val && val.getTime() > Date.now(),
      "Cannot set time start past the current time",
    ],
  },

  timeEnd: {
    type: Date,
    required: true,
    validate: [
      (val) => val && val.getTime() > Date.now(),
      "Cannot set time end past the current time",
    ],
  },
  taggedUsers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    validate: [
      (val) => val && val.length >= 1 && val.length <= 10,
      `Tagged users number invalid (1-10).`,
    ],
  },
});

module.exports = mongoose.model("Event", eventSchema);
