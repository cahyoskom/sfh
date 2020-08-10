import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  REQUEST_USER_DATA,
  GET_USER_DATA,
  SET_PROFILE_SUCCESS,
  SET_PROFILE_FAILED,
  SET_PROFILE
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';

const getAccountState = state => state.account;
export function* requestUserData() {
  try {
    const reqUserData = yield call(services.GET, API_BASE_URL_DEV + API_PATH.profile, HeaderAuth());
    //console.log(reqUserData);
    console.log(reqUserData.data.data);

    yield put({
      type: GET_USER_DATA,
      value: reqUserData.data.data
    });
    // yield put({
    //   type: GET_USER_DATA,
    //   data: reqUserData.value
    // });
  } catch (e) {
    // yield put(e);
  }
}

export function* updateProfile() {
  try {
    const accountState = yield select(getAccountState);
    const profileState = accountState.profile;
    let param = {
      email: profileState.email,
      password: profileState.password,
      phone: profileState.phone,
      name: profileState.name
    };
    const _response = yield call(services.PUT, API_BASE_URL_DEV + API_PATH.profile, param, HeaderAuth());
    if (_response.status === 200) {
      yield put({
        type: SET_PROFILE_SUCCESS
      });
    } else if (_response.data.error === 401001) {
      yield put({
        type: SET_PROFILE_FAILED,
        value: _response.data.message
      });
    } else {
      yield put({
        type: SET_PROFILE_FAILED,
        value: _response.data.message
      });
    }
  } catch (error) {
    yield put({
      type: SET_PROFILE_FAILED,
      value: error
    });
  }
}

export default function* rootSaga() {
  yield all([takeEvery(REQUEST_USER_DATA, requestUserData), takeEvery(SET_PROFILE, updateProfile)]);
}
