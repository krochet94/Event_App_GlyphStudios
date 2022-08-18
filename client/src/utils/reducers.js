import {
  ALL_EVENTS_REQUEST,
  ALL_EVENTS_SUCCESS,
  ALL_EVENTS_FAIL,
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_RESET,
  NEW_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_RESET,
  DELETE_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_RESET,
  UPDATE_EVENT_FAIL,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  NEW_USER_REQUEST,
  NEW_USER_SUCCESS,
  NEW_USER_RESET,
  NEW_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  UPDATE_USER_FAIL,
  CLEAR_ERRORS,
} from "./constants";

export const eventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case ALL_EVENTS_REQUEST:
      return {
        loading: true,
        events: [],
      };

    case ALL_EVENTS_SUCCESS:
      return {
        loading: false,
        events: action.payload.events,
      };
    case ALL_EVENTS_FAIL:
      return {
        loading: false,
        events: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newEventReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case NEW_EVENT_REQUEST:
      return { ...state, loading: true };

    case NEW_EVENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        event: action.payload.event,
      };

    case NEW_EVENT_RESET:
      return { ...state, success: false };

    case NEW_EVENT_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const getEventReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload };

    case EVENT_DETAILS_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
    case UPDATE_EVENT_REQUEST:
      return { ...state, loading: true };

    case DELETE_EVENT_SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };

    case UPDATE_EVENT_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };

    case DELETE_EVENT_RESET:
      return { ...state, isDeleted: false };

    case UPDATE_EVENT_RESET:
      return { ...state, isUpdated: false };

    case DELETE_EVENT_FAIL:
    case UPDATE_EVENT_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        loading: true,
        users: [],
      };

    case ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
      };
    case ALL_USERS_FAIL:
      return {
        loading: false,
        users: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case NEW_USER_REQUEST:
      return { ...state, loading: true };

    case NEW_USER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        user: action.payload.user,
      };

    case NEW_USER_RESET:
      return { ...state, success: false };

    case NEW_USER_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };

    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };

    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };

    case DELETE_USER_RESET:
      return { ...state, isDeleted: false };

    case UPDATE_USER_RESET:
      return { ...state, isUpdated: false };

    case DELETE_USER_FAIL:
    case UPDATE_USER_FAIL:
      return { ...state, error: action.payload };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};