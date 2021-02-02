import { takeEvery } from "redux-saga/effects";
import { RECEIVED_QUESTION } from "../constants/types";

// Add to cart saga
export function* putQuestionsSaga() {
  yield takeEvery(RECEIVED_QUESTION, function* (action) {
    try {
      // console.log('action----------------', action.payload)
      // yield put(putQuestions(action.payload));
    } catch (err) {
      console.log("err", err);
    }
  });
}
