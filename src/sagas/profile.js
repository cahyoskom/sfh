import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  REQUEST_USER_DATA,
  GET_USER_DATA,
  SET_PROFILE_SUCCESS,
  SET_PROFILE_FAILED,
  SET_PROFILE,
  SET_UPDATE_PASSWORD,
  ON_CHANGE_STATE_EDIT_PROFILE
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';
import { data } from 'jquery';

const getProfileState = state => state.profile;

export function* requestUserData() {
  try {
    const reqUserData = yield call(services.GET, API_BASE_URL_DEV + API_PATH.profile, HeaderAuth());
    //console.log(reqUserData);
    console.log(reqUserData.data);

    yield put({
      type: GET_USER_DATA,
      value: reqUserData.data
    });
  } catch (e) {
    // yield put(e);
  }
}

export function* updateProfile() {
  try {
    const profileState = yield select(getProfileState);
    const profileInfoState = profileState.data;
    const profileEditState = profileState.profile;

    let old_password = {
      password: profileInfoState.password
    };

    let param = {
      email: profileEditState.email,
      password: profileEditState.password,
      phone: profileEditState.phone,
      name: profileEditState.name,
      avatar: profileEditState.avatar,
      new_password: profileEditState.new_password,
      re_new_password: profileEditState.re_new_password
    };

    // if (old_password.password != param.password) {
    //   yield put({
    //     type: ON_CHANGE_STATE_EDIT_PROFILE,
    //     value: 'Password Lama Salah',
    //     field: 'errormsg'
    //   });
    // }

    // if (param.new_password != param.re_new_password) {
    //   yield put({
    //     type: ON_CHANGE_STATE_EDIT_PROFILE,
    //     value: 'Password Tidak Sama',
    //     field: 'errormsg'
    //   });
    // }

    if (param.name == '') {
      yield put({
        type: ON_CHANGE_STATE_EDIT_PROFILE,
        value: 'Nama tidak boleh kosong',
        field: 'errormsg'
      });
      yield put({
        type: ON_CHANGE_STATE_EDIT_PROFILE,
        value: true,
        field: 'openAlert'
      });
      return;
    }

    console.log(param);

    const _response = yield call(services.POST, API_BASE_URL_DEV + API_PATH.profile, param, HeaderAuth());
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
