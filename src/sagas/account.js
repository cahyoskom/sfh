import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_TOKEN_SUCCESS,
  SET_LOGOUT,
  SET_LOADER
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";

const getAccountState = state => state.account;

export function* login() {
  try {
    const accountState = yield select(getAccountState);
    const loginState = accountState.login;
    yield put({
      type: SET_LOADER,
      value: true
    });
    let param = {
      username: loginState.username,
      password: loginState.password
    };

    const _response = yield call(services.POST, API_BASE_URL_DEV + API_PATH.login, param, Header());

    if (_response.status == 200) {
      console.log('hasil login', _response);
      let data = _response.data
      let profile = {
        id: data.user.user_id || "",
        name: data.name || "",
        username: data.user.user_name || "",
        email: data.user.email || ""
      }
      if (data.token && data.token != "") {
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("token", data.token || null);
        localStorage.setItem("name", JSON.stringify(data.user.user_name));
        localStorage.setItem("user_id", JSON.stringify(data.user.user_id));
        yield put({
          type: SET_LOGIN_SUCCESS,
          value: profile
        });
        yield put({
          type: SET_TOKEN_SUCCESS,
          value: data.token
        });
        
        let who = data.roles[0].group_id;
        let login;

        if(who == 1){ login = "taskortu" }
        else if(who == 2){ login = "taskkepsek" }
        else if(who == 3){ login = "taskortu" }
        else if(who == 4){ login = "taskguru" }
        // else if(who == 5){ login = "taskguardian" }
        else if(who == 6){ login = "tasksiswa" }

        let _url = process.env.PUBLIC_URL + login;
        window.location.href = _url;
      }
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function* logout() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const _response = yield call(services.GET, API_BASE_URL_DEV + API_PATH.logout, HeaderAuth());
    yield put({
      type: SET_LOADER,
      value: false
    });
    localStorage.clear()
    window.location.href = process.env.PUBLIC_URL + "login";
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SET_LOGIN, login),
    takeEvery(SET_LOGOUT, logout)
  ]);
}
