import axios from "axios";

import {
  ALL_EVENTS_REQUEST,
  ALL_EVENTS_SUCCESS,
  ALL_EVENTS_FAIL,
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
  NEW_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CLEAR_ERRORS,
} from "./constants";

//Get all events
export const getEvents = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_EVENTS_REQUEST });
    const { data } = await axios.get("/api/v1/events");
    dispatch({
      type: ALL_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_EVENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Add new event
export const newEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/event", eventData, config);

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });
    const { data } = await axios.delete(`/api/v1/event/${id}`);
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update event
export const updateEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/event/${eventData._id}`,
      eventData,
      config
    );
    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get an event details
export const getEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/event/${id}`);
    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data.event,
    });

  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get all users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get("/api/v1/users");
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Add new user
export const newUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_USER_REQUEST });
     const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }; 
    const { data } = await axios.post("/api/v1/user", userData, config);

    dispatch({
      type: NEW_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(`/api/v1/user/${id}`);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update user
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/user/${userData._id}`,
      userData,
      config
    );
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
