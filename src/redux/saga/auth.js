import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  AUTH_ADMIN_REQUEST,
  AUTH_REQUEST,
  CHECK_CREDENTIALS_REQUEST,
  GET_AUTH_USER,
} from "../../constants/types";
import {
  checkCredentialsFailed,
  checkCredentialsSuccess,
  getAuthUserFailed,
  getAuthUserSuccess,
  setAdminAuthFailed,
  setAdminAuthSuccess,
  setAuthFailed,
  setAuthSuccess,
} from "../actions/auth";
import { getJwt } from "../selectors/auth";
import { setUserStatus } from "../actions/user";
// real API calls
// import { singIn, logIn } from "../../api/auth";
// import {checkAdminCredentials} from "../../api/auth";
// there are mock API calls
import {
  checkAdminCredentials,
  getUserData,
  logIn,
  singIn,
} from "../../mock/common";

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

export function* authCheckCredentialsSaga() {
  yield takeEvery(CHECK_CREDENTIALS_REQUEST, function* (action) {
    // try {
    //   const response = yield call(checkAdminCredentials, action.payload);
    //   console.log("SAGA response", response);
    //   // TODO: remove lines below and chabge the logic after server will work
    //   if (response) {
    //     yield put(checkCredentialsSuccess(response));
    //   } else {
    //     yield put(checkCredentialsFailed("Password or login incorrect!"));
    //   }
    // } catch (err) {
    //   console.log("SAGA err", err);
    //   yield put(checkCredentialsFailed(err));
    // }
  });
}
