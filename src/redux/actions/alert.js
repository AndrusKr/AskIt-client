import {
  SET_ERROR_COUNTER,
  SET_ERROR_DURATION,
  SET_ERROR_DURATION_TIMER,
  SET_ERROR_MESSAGE,
  SET_ERROR_SHOWED,
  SET_ERROR_TIMER,
  SET_SEVERITY_STATUS,
} from "../../constants/types";

export const setErrorShowed = (isErrorShowed) => ({
  type: SET_ERROR_SHOWED,
  payload: isErrorShowed,
});

export const setDurationContinuing = (isDurationContinuing) => ({
  type: SET_ERROR_DURATION,
  payload: isDurationContinuing,
});

export const setErrorTimer = (timer) => ({
  type: SET_ERROR_TIMER,
  payload: timer,
});

export const setErrorDurationTimer = (timer) => ({
  type: SET_ERROR_DURATION_TIMER,
  payload: timer,
});

export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  payload: message,
});

export const setErrorCounter = (counter) => ({
  type: SET_ERROR_COUNTER,
  payload: counter,
});

export const setSeverityStatus = (status) => ({
  type: SET_SEVERITY_STATUS,
  payload: status,
});
