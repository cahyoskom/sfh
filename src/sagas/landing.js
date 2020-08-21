import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  ATTEMPT_JOIN_CLASS,
  ATTEMPT_CREATE_SCHOOL,
  ATTEMPT_CREATE_CLASS,
  CREATE_SCHOOL_SUCCESS,
  CREATE_CLASS_SUCCESS,
  SET_GET_CLASSES,
  GET_CLASSES_SUCCESS
} from '../constants/ActionTypes';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';
import { joinClass } from '../actions';
import { fail, success } from '../components/common/toast-message';
const getLandingState = state => state.landingpage;

// export function* joinClass() {
//   //DO SOMETHING
//   return;
// }
// export function* createClass() {
//   //DO SOMETHING
// }
export function* createSchool() {
  const state = yield select(getLandingState);
  const schoolState = state.newSchool;
  let param = {
    name: schoolState.name,
    address: schoolState.address,
    zipcode: schoolState.postalCode,
    phone: schoolState.phoneNumber,
    avatar: schoolState.picture,
    note: schoolState.note
  };
  const _response = yield call(services.PUT, API_BASE_URL_DEV + API_PATH.school, param, HeaderAuth());
  if (_response.status === 200) {
    yield put({
      type: CREATE_SCHOOL_SUCCESS
    });
  } else {
    console.log(_response.data.message);
  }
}
export function* createClass() {
  const state = yield select(getLandingState);
  const classState = state.newClass;
  if (!classState.name) {
    fail("Nama kelas tidak boleh kosong")
    return;
  }
  
  let param = {
    name: classState.name,
    description: classState.description,
    schoolCode: classState.school
  };
  const _response = yield call(services.PUT, API_BASE_URL_DEV + API_PATH.createClass, param, HeaderAuth());
  if (_response.status === 200) {
    yield put({
      type: CREATE_CLASS_SUCCESS
    });
  } else {
    console.log(_response.data.message);
  }
}
export function* getClasses() {
  const state = yield select(getLandingState);
  let param = {}
  // const _response = {data: {data:[],message:'bacot'}}
  const _response = yield call(services.GET, API_BASE_URL_DEV + API_PATH.getClasses, HeaderAuth());
  console.log(_response)
  if (_response.status === 200) {
    let data = _response.data.data
    for (let i in data) {
      console.log(i)
      data[i]['url'] = `${process.env.PUBLIC_URL}/class-info/`+data[i].id
    }
    yield put({
      type: GET_CLASSES_SUCCESS,
      value: _response.data.data
    });
  } else {
    console.log(_response.data.message);
  }
  
}


export default function* rootSaga() {
  yield all([
    // takeEvery(ATTEMPT_JOIN_CLASS, joinClass),
    takeEvery(SET_GET_CLASSES, getClasses),
    takeEvery(ATTEMPT_CREATE_CLASS, createClass),
    takeEvery(ATTEMPT_CREATE_SCHOOL, createSchool)
  ]);
}
