import {
  CHANGE_QUESTIONS_LIKES,
  IS_LOADING,
  RECEIVED_QUESTION,
  REMOVE_QUESTION,
  SET_EDIT_QUESTION_TEXT,
  SET_PIN_QUESTION, SET_QUESTIONS_LOADING,
  SET_UNPIN_QUESTION,
  UPDATE_QUESTION,
} from "../../constants/types";

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

export const removeQuestion = (question) => ({
  type: REMOVE_QUESTION,
  payload: question,
});

export const updateQuestion = (data) => ({
  type: UPDATE_QUESTION,
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