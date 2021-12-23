import { call, put, takeEvery } from "redux-saga/effects";
import { BAN_USER_REQUEST, USERS_LIST_REQUEST } from "../../constants/types";
// API CALL
// import {bunUser, getUsersList} from "../../api/user";
// MOCK API CALL
import { getUsersList, bunUser } from "../../mock/common";
import {
  banUserFailed,
  banUserSucceed,
  setUsersListFailed,
  setUsersListSucceed,
  setSignedInUserStatus,
} from "../actions/user";

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

export function* bunUserRequestSaga() {
  yield takeEvery(BAN_USER_REQUEST, function* (action) {
    try {
      // TODO: use when API is ready
      // const response = yield call(bunUser, action.payload);
      // use now, just change state in redux
      yield put(banSignedInUserSucceed(action.payload));
      yield put(setSignedInUserStatus(action.payload));
    } catch (err) {
      console.log("err", err);
      yield put(banUserFailed(err));
    }
  });
}
