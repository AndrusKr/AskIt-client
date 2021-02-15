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
import { getUserData, adminLogIn, signUp } from "../../api/auth";
// there are mock API calls
// import { getUserData, adminLogIn, signUp } from "../../mock/common";
import { getJwt } from "../selectors/auth";
import { setUserStatus } from "../actions/user";

export function* authSuccessSaga() {
  yield takeEvery(AUTH_REQUEST, function* (action) {
    try {
      const response = yield call(signUp, action.payload);
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("nickname", response.data.nickname);
      yield put(setAuthSuccess(response.data));
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
      console.log("response.isBlocked SAGA", response);
      yield put(setUserStatus(response.isBlocked));
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
      const response = yield call(adminLogIn, nickname, password);
      // TODO: remove the next line after server will work
      response.nickname = action.payload.nickname;
      yield put(setAdminAuthSuccess(response));
      localStorage.setItem("jwt", "qweasdzxc");
    } catch (err) {
      console.log("err ADMIN", err);
      yield put(setAdminAuthFailed(err));
    }
  });
}
