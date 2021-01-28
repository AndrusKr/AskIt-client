import {List} from 'immutable';
import {
  CHANGE_QUESTIONS_LIKES,
  GET_LATEST_QUESTIONS,
  IS_LOADING,
  QUESTIONS_ERROR,
  RECEIVED_QUESTION
} from "../constants/types";

export const defaultState = {
  questions: List(),
  activeQuestions: List(),
  answeredQuestions: List(),
  current: null,
  loading: true,
  error: null,
};

export default (state, action) => {
  switch (action.type) {
    case RECEIVED_QUESTION:
      return state
        .set('activeQuestions', state.get('activeQuestions').push(action.payload))
        .set('loading', false)

    case CHANGE_QUESTIONS_LIKES:
      const updatedIdx = state.get('activeQuestions')
        .findIndex((i) => i.id === action.payload.id)
      return state
        .set('activeQuestions', List([...state.get('activeQuestions').set(updatedIdx, action.payload)]))
        .set('loading', false)

    case GET_LATEST_QUESTIONS:
      return state
        .set('questions', action.payload)
        .set('activeQuestions', List(action.payload.filter((q) => q.answered === null)))
        .set('answeredQuestions', List(action.payload.filter((q) => q.answered !== null)))
        .set('loading', false)

    case IS_LOADING:
      return state
        .set('loading', action.payload)

    case QUESTIONS_ERROR:
      return state
        .set('error', action.payload)

    default: {
      return state;
    }
  }
}
