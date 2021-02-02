import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  getAuthUserFailed,
  getAuthUserSuccess,
  setAuthFailed,
  setAuthSuccess,
} from "../actions/auth";
// real API calls
import { getUserData, signUp } from "../api/auth";
import { AUTH_REQUEST, GET_AUTH_USER } from "../constants/types";
// there are mock API calls
// import {getUserData, signUp} from "../mock/common";
import { getJwt } from "../selectors/auth";

export function* authSuccessSaga() {
  yield takeEvery(AUTH_REQUEST, function* (action) {
    try {
      const response = yield call(signUp, action.payload);
      yield put(setAuthSuccess(response.data));
      localStorage.setItem("jwt", response.data.jwt);
    } catch (err) {
      console.log("err", err);
      yield put(setAuthFailed(err));
    }
  });
}

export function* getUserDataSaga() {
  yield takeEvery(GET_AUTH_USER, function* () {
    try {
      const jwt = yield select(getJwt);
      const response = yield call(getUserData, jwt);
      yield put(getAuthUserSuccess(response));
    } catch (err) {
      console.log("err", err);
      yield put(getAuthUserFailed(err));
    }
  });
}
