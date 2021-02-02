import {
  CHANGE_QUESTIONS_LIKES,
  IS_LOADING,
  RECEIVED_QUESTION,
} from "../constants/types";

export const putQuestions = (questions) => ({
  type: RECEIVED_QUESTION,
  payload: questions,
});

export const setQuestionLoading = (isLoaded) => ({
  type: IS_LOADING,
  payload: isLoaded,
});

export const changeQuestionLikes = (question) => ({
  type: CHANGE_QUESTIONS_LIKES,
  payload: question,
});
