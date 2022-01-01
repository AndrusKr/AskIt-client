// import { put, takeEvery } from "redux-saga/effects";
// import { NEW_QUESTION_RECEIVED } from "../../constants/types";
// import { setAllQuestions } from "../actions/questions";
//
// // Add to cart saga
// export function* putQuestionsSaga() {
//   yield takeEvery(NEW_QUESTION_RECEIVED, function* (action) {
//     try {
//       console.log("action----------------", action.payload);
//       yield put(setAllQuestions(action.payload));
//     } catch (err) {
//       console.log("err", err);
//     }
//   });
// }
