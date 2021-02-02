import { call, put, select, takeEvery } from "redux-saga/effects";
import { AUTH_REQUEST, GET_AUTH_USER } from "../constants/types";
import {
  getAuthUserFailed,
  getAuthUserSuccess,
  setAuthFailed,
  setAuthSuccess,
} from "../actions/auth";
// real API calls
// import {singIn} from "../api/questions";
// there are mock API calls
import { getUserData, singIn } from "../mock/common";
import { getJwt } from "../selectors/auth";

export function* authSuccessSaga() {
  yield takeEvery(AUTH_REQUEST, function* (action) {
    try {
      const response = yield call(singIn, action.payload);
      // TODO: remove the next line after server will work
      response.currentUser.nickname = action.payload;
      yield put(setAuthSuccess(response));
      localStorage.setItem("jwt", "qweqweqwe");
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
