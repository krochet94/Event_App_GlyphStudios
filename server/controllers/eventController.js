const Event = require("../models/event");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//validation function at the bottom

//Create new event  =>  /api/v1/event
exports.newEvent = catchAsyncErrors(async (req, res, next) => {
  //find all
  const events = await Event.find();

  //runs validation function
  await validation(events, req.body, res);

  //exits if validation throws and error
  if(res.statusCode===404){
    return;
  }
  const event = await Event.create(req.body);
  res.status(200).json({
    success: true,
    event,
  });
});

//Get all events => /api/v1/events
exports.getEvents = catchAsyncErrors(async (req, res, next) => {
  const events = await Event.find();
  res.status(200).json({
    success: true,
    events,
  });
});

//Get an event details => /api/v1/event/:id
exports.getEvent = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  res.status(200).json({
    success: true,
    event,
  });
});

// Update an event => /api/v1/event/:id
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {

  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  //find all except with the ID
  const events = await Event.find({_id: {$ne: `${req.params.id}`}}); 

  //runs validation function
  await validation(events, req.body, res);

  //exits if validation throws and error
  if(res.statusCode===404){
    return;
  }

  await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Event updated",
  });
});

//Delete an event => /api/v1/event/:id
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  await event.remove();

  res.status(200).json({
    success: true,
    message: "Event deleted",
  });
});


//validation function
const validation = async(events, body, res) =>{
  var timeOverlap = false; //initial value
  const a = new Date(body.timeStart).getTime();
  const b = new Date(body.timeEnd).getTime(); //getTime for overall total value
  const A = new Date(body.timeStart).getHours();
  const B = new Date(body.timeEnd).getHours(); //getHours for the hour of the day (0-23)

  //validation of time start and time end
  //start < end; start > present; end > present 
  if (a >= b || a < Date.now() || b < Date.now()) {
    return res.status(404).json({
      success: false,
      message: "Invalid time schedule. Select another time",
    });
  }

  //validation for 8am(8) to 8pm(20)
  // (hours) start >= 8 hours; end  <= 20 hours ; B-A < = 12 hours
  if(A >= 8 || B <= 20 || B-A <= 12){
    return res.status(404).json({
      success: false,
      message: "Time should be in between 8AM to 8PM, same day",
    });
  }

  //validation of time overlapping
  events.map((event) => {
     if (a < event.timeEnd.getTime() && b > event.timeStart.getTime()) {
      timeOverlap = true;
      return;
    }
  });
  
  if (timeOverlap) {
    return res.status(404).json({
      success: false,
      message: "Time overlapping detected, select another schedule",
    });
  }

  //validation tagged users (1-10)
  if(body.taggedUsers.length <1 || body.taggedUsers.length >10){
    return res.status(404).json({
      success: false,
      message: "Tagged users number invalid (1-10)",
    });
  }
}