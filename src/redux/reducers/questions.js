import { List } from "immutable";
import {
  QUESTION_LIKES_CHANGED,
  IS_LOADING,
  QUESTIONS_ERROR,
  ALL_QUESTIONS_RECEIVED,
  NEW_QUESTION_RECEIVED,
  QUESTION_REMOVED,
  SET_EDIT_QUESTION_TEXT,
  SET_PIN_QUESTION,
  SET_UNPIN_QUESTION,
  QUESTION_UPDATED,
} from "../../constants/types";
// import { activeQuestions } from "../../mock/common";

export const defaultState = {
  questions: List(),
  //TODO: using mock data here
  activeQuestions: List(/*activeQuestions*/),
  answeredQuestions: List(),
  editedText: "",
  isEditActive: false,
  editedQuestionId: null,
  current: null,
  loading: true,
  error: null,
  pinnedQuestionId: null,
};

export default (state, action) => {
  switch (action.type) {
    case NEW_QUESTION_RECEIVED:
      return state
        .set(
          "activeQuestions",
          state.get("activeQuestions").push(action.payload)
        )
        .set("loading", false);

    case ALL_QUESTIONS_RECEIVED:
      return state
        .set("questions", action.payload)
        .set(
          "activeQuestions",
          List(action.payload.filter((q) => q.answerTime === null))
        )
        .set(
          "answeredQuestions",
          List(action.payload.filter((q) => q.answerTime !== null))
        )
        .set("loading", false);

    case QUESTION_LIKES_CHANGED:
      const updatedIdx = state
        .get("activeQuestions")
        .findIndex((i) => i.id === action.payload.id);
      return state
        .set(
          "activeQuestions",
          List([
            ...state.get("activeQuestions").set(updatedIdx, action.payload),
          ])
        )
        .set("loading", false);

    case QUESTION_REMOVED:
      const removedIdx = state
        .get("activeQuestions")
        .findIndex((i) => i.id === action.payload);
      return state
        .set("activeQuestions", state.get("activeQuestions").delete(removedIdx))
        .set("loading", false);

    case QUESTION_UPDATED:
      const editedIdx = state
        .get("activeQuestions")
        .findIndex((i) => i.id === action.payload.editedQuestionId);
      return state
        .set(
          "activeQuestions",
          List([
            ...state
              .get("activeQuestions")
              .setIn([editedIdx, "text"], action.payload.editQuestionText),
          ])
        )
        .set("editedText", "")
        .set("isEditActive", false)
        .set("editedQuestionId", null)
        .set("loading", false);

    case SET_EDIT_QUESTION_TEXT:
      return state
        .set("editedText", action.payload.text)
        .set("isEditActive", action.payload.isEditActive)
        .set("editedQuestionId", action.payload.id);

    case SET_PIN_QUESTION:
      const prevPinnedIdx = state
        .get("activeQuestions")
        .findIndex((i) => i.id === state.get("pinnedQuestionId"));

      const newPinnedIdx = state
        .get("activeQuestions")
        .findIndex((i) => i.id === action.payload);

      return state
        .set(
          "activeQuestions",
          List([
            ...state
              .get("activeQuestions")
              .setIn([prevPinnedIdx, "isPinned"], false)
              .setIn([newPinnedIdx, "isPinned"], true),
          ])
        )
        .set("pinnedQuestionId", action.payload)
        .set("loading", false);

    case SET_UNPIN_QUESTION:
      const pinnedIdx = state
        .get("activeQuestions")
        .findIndex((i) => i.id === action.payload);
      return state
        .set(
          "activeQuestions",
          List([
            ...state
              .get("activeQuestions")
              .setIn([pinnedIdx, "isPinned"], false),
          ])
        )
        .set("pinnedQuestionId", null)
        .set("loading", false);

    case IS_LOADING:
      return state.set("loading", action.payload);

    case QUESTIONS_ERROR:
      return state.set("error", action.payload);

    default: {
      return state;
    }
  }
};
