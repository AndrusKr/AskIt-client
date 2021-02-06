import { call, put, takeEvery } from "redux-saga/effects";
import { USERS_LIST_REQUEST } from "../../constants/types";
// API CALL
// import { getUsersList } from "../../api/user";
// MOCK API CALL
import { getUsersList } from "../../mock/common";
import { setUsersListFailed, setUsersListSucceed } from "../actions/user";

export function* usersListRequestSaga() {
  yield takeEvery(USERS_LIST_REQUEST, function* () {
    try {
      const response = yield call(getUsersList);
      yield put(setUsersListSucceed(response));
    } catch (err) {
      console.log("err", err);
      yield put(setUsersListFailed(err));
    }
  });
}
