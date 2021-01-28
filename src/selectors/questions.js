import {createSelector} from 'reselect'

export const getQuestions = (state) => state.get('questions').questions
export const getActiveQuestions = (state) => state.get('questions').activeQuestions
export const getAnsweredQuestions = (state) => state.get('questions').answeredQuestions
export const getCurrent = (state) => state.get('questions').current
export const getQuestionLoading = (state) => state.get('questions').loading
export const getQuestionError = (state) => state.get('questions').error

export const getFilteredAnsweredQuestions = createSelector(
  [getActiveQuestions],
  (activeQuestions) =>
    [...activeQuestions].sort((q1, q2) => {
      const q1Time = Date.parse(q1.asked)
      const q2Time = Date.parse(q2.asked)
      if (q1.likes.length < q2.likes.length) {
        return 1
      } else if (q1.likes.length > q2.likes.length) {
        return -1
      } else {
        if (q1Time < q2Time) {
          return -1
        } else if (q1Time > q2Time) {
          return 1
        } else {
          return 0
        }
      }
    })
);