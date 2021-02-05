import { all } from "redux-saga/effects";
import * as auth from "./auth";
import * as questions from "./questions";

export default function* rootSaga() {
  yield all([
    auth.authSuccessSaga(),
    auth.getUserDataSaga(),
    auth.authAdminSuccessSaga(),
    questions.putQuestionsSaga(),
  ]);
}
