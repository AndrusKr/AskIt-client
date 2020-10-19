import { GET_LATEST_QUESTIONS, RECEIVED_QUESTION } from "../types"

export default (state, action) => {
  switch (action.type) {
    case RECEIVED_QUESTION:
      return {
        ...state,
        questions: [action.payload, ...state.questions],
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
    default:
      return state
  }
}
