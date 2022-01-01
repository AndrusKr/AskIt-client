import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  ADMIN_LOG_IN_REQUEST,
  GET_SIGNED_IN_USER_DATA_REQUEST,
  USER_SIGN_IN_REQUEST,
  CHECK_CREDENTIALS_REQUEST,
  USER_SIGN_OUT_REQUEST,
} from "../../constants/types";
import {
  setUserSignOutFailed,
  setUserSignOutSuccess,
  getAuthUserFailed,
  getSignedInUserSuccess,
  setAdminLogInFailed,
  setAdminLogInSuccess,
  setUserSignInFailed,
  setUserSignInSuccess,
} from "../actions/auth";
import { getJwt } from "../selectors/auth";
import { setSignedInUserStatus } from "../actions/user";
// real API calls
import {
  adminLogIn,
  getSignedInUserData,
  signUp,
  signOut,
} from "../../api/auth";
// there are mock API calls
import "../../mock/common";

export function* userSignInSuccessSaga() {
  yield takeEvery(USER_SIGN_IN_REQUEST, function* (action) {
    try {
      const response = yield call(signUp, action.payload);
      localStorage.setItem("jwt", response.data.jwt);
      localStorage.setItem("nickname", response.data.nickname);
      yield put(setUserSignInSuccess(response.data));
    } catch (err) {
      console.log("err", err);
      yield put(setUserSignInFailed(err));
    }
  });
}

export function* userSignOutSuccessSaga() {
  yield takeEvery(USER_SIGN_OUT_REQUEST, function* (action) {
    try {
      const response = yield call(signOut);
      localStorage.removeItem("jwt");
      localStorage.removeItem("nickname");
      yield put(setUserSignOutSuccess(response.data));
    } catch (err) {
      console.log("err", err);
      yield put(setUserSignOutFailed(err));
    }
  });
}

export function* getSignedInUserDataSaga() {
  yield takeEvery(GET_SIGNED_IN_USER_DATA_REQUEST, function* () {
    try {
      const jwt = yield select(getJwt);
      const response = yield call(getSignedInUserData, jwt);
      yield put(getSignedInUserSuccess(response.data));
      yield put(setSignedInUserStatus(response.isBlocked));
    } catch (err) {
      console.log("err", err);
      yield put(getAuthUserFailed(err));
    }
  });
}

export function* authAdminSuccessSaga() {
  yield takeEvery(ADMIN_LOG_IN_REQUEST, function* (action) {
    try {
      const { nickname, password } = action.payload;
      const response = yield call(adminLogIn, nickname, password);
      // TODO: remove the next line after server will work
      response.nickname = action.payload.nickname;
      yield put(setAdminLogInSuccess(response));
      localStorage.setItem("jwt", "qweasdzxc");
    } catch (err) {
      console.log("err ADMIN", err);
      yield put(setAdminLogInFailed(err));
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
