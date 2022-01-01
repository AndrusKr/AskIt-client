import {
  QUESTION_LIKES_CHANGED,
  IS_LOADING,
  ALL_QUESTIONS_RECEIVED,
  NEW_QUESTION_RECEIVED,
  QUESTION_REMOVED,
  SET_EDIT_QUESTION_TEXT,
  SET_PIN_QUESTION,
  SET_UNPIN_QUESTION,
  QUESTION_UPDATED,
} from "../../constants/types";

export const addNewQuestion = (question) => ({
  type: NEW_QUESTION_RECEIVED,
  payload: question,
});

export const setAllQuestions = (questions) => ({
  type: ALL_QUESTIONS_RECEIVED,
  payload: questions,
});

export const setQuestionLoading = (isLoaded) => ({
  type: IS_LOADING,
  payload: isLoaded,
});

export const changeQuestionLikes = (question) => ({
  type: QUESTION_LIKES_CHANGED,
  payload: question,
});

export const removeQuestion = (question) => ({
  type: QUESTION_REMOVED,
  payload: question,
});

export const updateQuestion = (data) => ({
  type: QUESTION_UPDATED,
  payload: data,
});

export const setQuestionData = (editData) => ({
  type: SET_EDIT_QUESTION_TEXT,
  payload: editData,
});

export const setPinnedQuestion = (id) => ({
  type: SET_PIN_QUESTION,
  payload: id,
});

export const setUnpinQuestion = (id) => ({
  type: SET_UNPIN_QUESTION,
  payload: id,
});
