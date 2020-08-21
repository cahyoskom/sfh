import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import { GET_TASK, SET_LIST_TASK } from '../constants/ActionTypes';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { HeaderAuth } from '../services/header';

const getTaskState = state => state.task;

export function* getTask(action) {
  try {
    const _res = yield call(services.GET, API_BASE_URL_DEV + API_PATH.task + '?class=' + action.value, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: SET_LIST_TASK,
        value: _res.data.listTask
      });
      // yield put({
      //   type: SET_FILTERED_CLASS,
      //   value: _res.data.listClass
      // });
    } else {
      console.log(_res.data.message);
    }
  } catch (err) {
    console.log(err.message);
  }
}
export default function* rootSaga() {
  yield all([takeEvery(GET_TASK, getTask)]);
}
