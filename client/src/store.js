import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  eventsReducer,
  newEventReducer,
  getEventReducer,
  eventReducer,
  usersReducer,
  newUserReducer,
  userReducer,
} from "./utils/reducers";

const reducer = combineReducers({
  events: eventsReducer,
  newEvent: newEventReducer,
  getEvent: getEventReducer,
  event: eventReducer,

  users: usersReducer,
  newUser: newUserReducer,
  user: userReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
