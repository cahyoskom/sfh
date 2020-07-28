import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import { GET_SCHOOL, SET_SCHOOL_DATA } from "../constants/ActionTypes";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { HeaderAuth } from "../services/header";

// const getAccountState = (state) => state.school;
export function* getSchoolInfo(action) {
  console.log("HEREEEEE");
  console.log(action.value);
  const _res = yield call(
    services.GET,
    API_BASE_URL_DEV + API_PATH.school + "/" + action.value,
    HeaderAuth()
  );
  if (_res.status === 200) {
    if (_res.data != null) {
      yield put({
        type: SET_SCHOOL_DATA,
        value: _res.data.data,
      });
    }
  } else {
    console.log(_res.data.message);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(GET_SCHOOL, getSchoolInfo)]);
}
