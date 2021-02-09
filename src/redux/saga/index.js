import { all } from "redux-saga/effects";
import * as auth from "./auth";
import * as questions from "./questions";
import * as user from "./user";

export default function* rootSaga() {
  yield all([
    auth.authSuccessSaga(),
    auth.getUserDataSaga(),
    auth.authAdminSuccessSaga(),
    user.usersListRequestSaga(),
    user.bunUserRequestSaga(),
    questions.putQuestionsSaga(),
  ]);
}
