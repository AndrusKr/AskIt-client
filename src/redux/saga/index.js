import { all } from "redux-saga/effects";
import * as auth from "./auth";
import * as questions from "./questions";
import * as user from "./user";

export default function* rootSaga() {
  yield all([
    auth.userSignInSuccessSaga(),
    auth.userSignOutSuccessSaga(),
    auth.getSignedInUserDataSaga(),
    auth.authAdminSuccessSaga(),
    auth.authCheckCredentialsSaga(),
    user.usersListRequestSaga(),
    user.bunUserRequestSaga(),
    questions.putQuestionsSaga(),
  ]);
}
