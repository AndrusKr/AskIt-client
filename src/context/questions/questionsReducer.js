import {GET_LATEST_QUESTIONS, IS_LOADING, QUESTIONS_ERROR, RECEIVED_QUESTION} from "../types"

export default (state, action) => {
  switch (action.type) {
    case RECEIVED_QUESTION:
      return {
        ...state,
        activeQuestions: [action.payload, ...state.activeQuestions],
        // activeQuestions: action.payload ? action.payload.filter((q) => q.answered === null) : [],
        // answeredQuestions: action.payload.filter((q) => q.answered !== null),
        loading: false,
      }
    case GET_LATEST_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        activeQuestions: action.payload.filter((q) => q.answered === null),
        answeredQuestions: action.payload.filter((q) => q.answered !== null),
        loading: false,
      }
    case IS_LOADING:
      console.log('IS_LOADING', action.payload)
      return {
        ...state,
        loading: action.payload,
      }
    case QUESTIONS_ERROR:
      console.log('QUESTIONS_ERROR', action.payload)
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
