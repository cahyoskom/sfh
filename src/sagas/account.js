import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_ROLES_SUCCESS,
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

      let data = _response.data
      let profile = {
        user_id: data.user.user_id || "",
        username: data.user.user_name || "",
        email: data.user.email || "",
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
        
        let roles = data.roles;
// console.log('ini d0i', roles[4])        
// console.log('ini dia', roles[4][0].group_name)
        if(!! roles[1]){
          let result = [];
          for(var i = 0; i < roles[1].length; i++){
            let role = {};
            role.group_id = roles[1][i].group_id;
            role.group_name = roles[1][i].group_name;
            role.class_id = roles[1][i].class_id;
            role.class_name = roles[1][i].class_name;
            role.subject_id = roles[1][i].subject_id;
            role.subject_name = roles[1][i].subject_name;
            role.student_id = roles[1][i].student_id;
            role.student_no = roles[1][i].student_no;
            role.student_name = roles[1][i].student_name;
            role.student_class_id = roles[1][i].student_class_id;
            role.sex = roles[1][i].sex;
            result.push(role);
          }
          localStorage.setItem("roles", JSON.stringify(result));
          window.location.href = process.env.PUBLIC_URL + "/usermanagement";
        }

        if(!! roles[2]){
          let result = [];
          for(var i = 0; i < roles[2].length; i++){
            let role = {};
            role.group_id = roles[2][i].group_id;
            role.group_name = roles[2][i].group_name;
            role.class_id = roles[2][i].class_id;
            role.class_name = roles[2][i].class_name;
            role.subject_id = roles[2][i].subject_id;
            role.subject_name = roles[2][i].subject_name;
            role.student_id = roles[2][i].student_id;
            role.student_no = roles[2][i].student_no;
            role.student_name = roles[2][i].student_name;
            role.student_class_id = roles[2][i].student_class_id;
            role.sex = roles[2][i].sex;
            result.push(role);
          }
          localStorage.setItem("roles", JSON.stringify(result));
          window.location.href = process.env.PUBLIC_URL + "/taskkepsek";
        }

        if(!! roles[3]){
          let result = [];
          for(var i = 0; i < roles[3].length; i++){
              let role = {};
              role.group_id = roles[3][i].group_id;
              role.group_name = roles[3][i].group_name;
              role.class_id = roles[3][i].class_id;
              role.class_name = roles[3][i].class_name;
              role.subject_id = roles[3][i].subject_id;
              role.subject_name = roles[3][i].subject_name;
              role.student_id = roles[3][i].student_id;
              role.student_no = roles[3][i].student_no;
              role.student_name = roles[3][i].student_name;
              role.student_class_id = roles[3][i].student_class_id;
              role.sex = roles[3][i].sex;
              result.push(role);
          }
          localStorage.setItem("roles", JSON.stringify(result));
          window.location.href = process.env.PUBLIC_URL + "/taskortu";
        }

        if(!! roles[4]){
          let result = [];
          for(var i = 0; i < roles[4].length; i++){
            let role = {};
            role.group_id = roles[4][i].group_id;
            role.group_name = roles[4][i].group_name;
            role.class_id = roles[4][i].class_id;
            role.class_name = roles[4][i].class_name;
            role.subject_id = roles[4][i].subject_id;
            role.subject_name = roles[4][i].subject_name;
            role.student_id = roles[4][i].student_id;
            role.student_no = roles[4][i].student_no;
            role.student_name = roles[4][i].student_name;
            role.student_class_id = roles[4][i].student_class_id;
            role.sex = roles[4][i].sex;
            result.push(role);
          }
          localStorage.setItem("roles", JSON.stringify(result));
          window.location.href = process.env.PUBLIC_URL + "/taskguru";
        }

        if(!! roles[5]){
          let result = [];
          for(var i = 0; i < roles[5].length; i++){
            let role = {};
            role.group_id = roles[5][i].group_id;
            role.group_name = roles[5][i].group_name;
            role.class_id = roles[5][i].class_id;
            role.class_name = roles[5][i].class_name;
            role.subject_id = roles[5][i].subject_id;
            role.subject_name = roles[5][i].subject_name;
            role.student_id = roles[5][i].student_id;
            role.student_no = roles[5][i].student_no;
            role.student_name = roles[5][i].student_name;
            role.student_class_id = roles[5][i].student_class_id;
            role.sex = roles[5][i].sex;
            result.push(role);
          }
          localStorage.setItem("roles", JSON.stringify(result));
          window.location.href = process.env.PUBLIC_URL + "/taskguardian";
        }

        if(!! roles[6]){ 
          console.log('disiswa');
          let result = [];
          for(var i = 0; i < roles[6].length; i++){
            let role = {};
            role.group_id = roles[6][i].group_id;
            role.group_name = roles[6][i].group_name;
            role.class_id = roles[6][i].class_id;
            role.class_name = roles[6][i].class_name;
            role.subject_id = roles[6][i].subject_id;
            role.subject_name = roles[6][i].subject_name;
            role.student_id = roles[6][i].student_id;
            role.student_no = roles[6][i].student_no;
            role.student_name = roles[6][i].student_name;
            role.student_class_id = roles[6][i].student_class_id;
            role.sex = roles[6][i].sex;
            result.push(role);
          }
          localStorage.setItem("roles", JSON.stringify(result));
          window.location.href = process.env.PUBLIC_URL + "/tasksiswa";
        }

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
    window.location.href = process.env.PUBLIC_URL + "/login";
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
