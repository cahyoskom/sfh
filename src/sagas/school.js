import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
  GET_SCHOOL,
  SET_SCHOOL_DATA,
  SUCCESS_UPDATE_SCHOOL,
  SAVE_UPDATE_SCHOOL,
  FAILED_UPDATE_SCHOOL,
  DELETE_SCHOOL,
  REMOVE_SCHOOL_DATA,
  SET_SCHOOL_AUTHORITY,
} from "../constants/ActionTypes";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { HeaderAuth } from "../services/header";

const getSchoolState = (state) => state.school;
export function* getSchoolInfo(action) {
  const _res = yield call(
    services.GET,
    API_BASE_URL_DEV + API_PATH.school + "/" + action.value,
    HeaderAuth()
  );
  if (_res.status === 200) {
    if (_res.data) {
      yield put({
        type: SET_SCHOOL_DATA,
        value: _res.data.data,
      });
      console.log(_res.data.hasAuthority);
      yield put({
        types: SET_SCHOOL_AUTHORITY,
        value: _res.data.hasAuthority
      })
    }
  } else {
    //SCHOOL NOT FOUND
    console.log(_res.data.message);
  }
}

export function* updateSchool() {
  const state = yield select(getSchoolState);
  const modal = state.modal;
  let param = {
    id: state.data.id,
    name: modal.name,
    address: modal.address,
    zipcode: modal.zipcode,
    phone: modal.phone,
    avatar: modal.avatar,
  };
  const _res = yield call(
    services.POST,
    API_BASE_URL_DEV + API_PATH.school,
    param,
    HeaderAuth()
  );
  if (_res.status === 200) {
    yield put({
      type: SUCCESS_UPDATE_SCHOOL,
    });
  } else {
    yield put({
      type: FAILED_UPDATE_SCHOOL,
      value: _res.data.message,
    });
  }
}

export function* removeSchool() {
  const state = yield select(getSchoolState);
  const schoolId = state.data.id;
  const _res = yield call(
    services.DELETE,
    API_BASE_URL_DEV + API_PATH.school + "/" + schoolId,
    HeaderAuth()
  );
  if (_res.status === 200) {
    yield put({
      type: REMOVE_SCHOOL_DATA,
    });
    window.location.href = process.env.PUBLIC_URL + "/";
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_SCHOOL, getSchoolInfo),
    takeEvery(SAVE_UPDATE_SCHOOL, updateSchool),
    takeEvery(DELETE_SCHOOL, removeSchool),
  ]);
}
