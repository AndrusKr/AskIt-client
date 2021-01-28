import {Set} from 'immutable'
import {
  REMOVE_ALERT,
  SET_ALERT,
  SET_ERROR_COUNTER,
  SET_ERROR_DURATION,
  SET_ERROR_DURATION_TIMER,
  SET_ERROR_MESSAGE,
  SET_ERROR_SHOWED,
  SET_ERROR_TIMER,
  SET_SEVERITY_STATUS
} from "../constants/types"

export const defaultState = {
  alert: Set(),
  isErrorShowed: false,
  isDurationContinuing: false,
  errorTimer: null,
  errorDurationTimer: null,
  errorMessage: '',
  errorCounter: 0,
  severityStatus: null,
}

export default (state, action) => {
  switch (action.type) {

    case SET_ALERT:
      return state
        .set('alert', Set(action.payload))

    case SET_ERROR_SHOWED:
      return state
        .set('isErrorShowed', action.payload)

    case SET_ERROR_DURATION:
      return state
        .set('isDurationContinuing', action.payload)

    case SET_ERROR_TIMER:
      return state
        .set('errorTimer', action.payload)

    case SET_ERROR_DURATION_TIMER:
      return state
        .set('errorDurationTimer', action.payload)

    case SET_ERROR_MESSAGE:
      return state
        .set('errorMessage', action.payload)

    case SET_ERROR_COUNTER:
      return state
        .set('errorCounter', action.payload)

    case SET_SEVERITY_STATUS:
      return state
        .set('severityStatus', action.payload)

    case REMOVE_ALERT:
      return state
        .set('alert', Set())

    default: {
      return state
    }
  }
};