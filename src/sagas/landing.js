import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  ATTEMPT_JOIN_CLASS,
  ATTEMPT_CREATE_SCHOOL,
  ATTEMPT_CREATE_CLASS,
  CREATE_SCHOOL_SUCCESS
} from '../constants/ActionTypes';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';
import { joinClass } from '../actions';
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

export default function* rootSaga() {
  yield all([
    // takeEvery(ATTEMPT_JOIN_CLASS, joinClass),
    // takeEvery(ATTEMPT_CREATE_CLASS, createClass),
    takeEvery(ATTEMPT_CREATE_SCHOOL, createSchool)
  ]);
}
