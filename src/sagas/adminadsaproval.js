import { call, put, all, takeEvery } from 'redux-saga/effects';
import {
  ADMIN_APROVAL_GET_DATA_ADS,
  ADMIN_APROVAL_GET_DATA_ADS_SUCCESS,
  ADMIN_APROVAL_GET_DETAIL_DATA_ADS,
  ADMIN_APROVAL_GET_DETAIL_DATA_ADS_SUCCESS
} from '../constants/ActionTypes';
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";


//Saga Get All Ads List
export function* adminAprovalGetAllAdsList() {
  try {
    const _response = yield call(services.GET, API_BASE_URL_DEV + API_PATH.admadslist, HeaderAuth());
    yield put({
      type: ADMIN_APROVAL_GET_DATA_ADS_SUCCESS,
      value: _response
    });
    console.log('saga : ', _response.data.data);
  } catch (error) {
    console.log(error);
  }
}

//Saga Get Detail Ads
export function* adminAprovalGetDetailAdsList(action) {
  try {
    console.log('saga-action: ', action)
    let param = action.id;
    const _response = yield call(services.GET, API_BASE_URL_DEV + API_PATH.admadsdetail + param, HeaderAuth());
    yield put({
      type: ADMIN_APROVAL_GET_DETAIL_DATA_ADS_SUCCESS,
      value: _response
    });
    console.log('saga-response: ', _response);
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ADMIN_APROVAL_GET_DATA_ADS, adminAprovalGetAllAdsList),
    takeEvery(ADMIN_APROVAL_GET_DETAIL_DATA_ADS, adminAprovalGetDetailAdsList),
  ]);
}
