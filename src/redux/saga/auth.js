import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  AUTH_ADMIN_REQUEST,
  AUTH_REQUEST,
  GET_AUTH_USER,
} from "../../constants/types";
import {
  getAuthUserFailed,
  getAuthUserSuccess,
  setAdminAuthFailed,
  setAdminAuthSuccess,
  setAuthFailed,
  setAuthSuccess,
} from "../actions/auth";
// real API calls
// import { singIn, logIn } from "../../api/auth";
// there are mock API calls
import { getUserData, logIn, singIn } from "../../mock/common";
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

export function* authAdminSuccessSaga() {
  yield takeEvery(AUTH_ADMIN_REQUEST, function* (action) {
    try {
      const { nickname, password } = action.payload;
      const response = yield call(logIn, nickname, password);
      // TODO: remove the next line after server will work
      response.currentUser.nickname = action.payload.nickname;
      yield put(setAdminAuthSuccess(response));
      localStorage.setItem("jwt", "qweasdzxc");
    } catch (err) {
      console.log("err ADMIN", err);
      yield put(setAdminAuthFailed(err));
    }
  });
}