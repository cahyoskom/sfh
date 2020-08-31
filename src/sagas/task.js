import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  GET_TASK,
  SET_LIST_TASK,
  ADD_NEW_TASK,
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_SUCCESS,
  DELETE_TASK,
  SUCCESS_ADD_TASK,
  SUCCESS_DELETE_TASK,
  ERROR_TASK
} from '../constants/ActionTypes';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { HeaderAuth, HeaderFile } from '../services/header';
import * as moment from 'moment';

const getTaskState = state => state.task;
const getClassState = state => state.class;

export function* getTask() {
  const classState = yield select(getClassState);
  const taskState = yield select(getTaskState);
  let url =
    API_BASE_URL_DEV +
    API_PATH.task +
    '?class=' +
    classState.classInfo.id +
    '&search=' +
    taskState.filter.search +
    '&startDate=' +
    taskState.filter.startDate +
    '&finishDate=' +
    taskState.filter.endDate;

  try {
    const _res = yield call(services.GET, url, HeaderAuth());
    if (_res.status === 200) {
      var now = moment();
      for (var task of _res.data.data) {
        var start = moment(task.start_date);
        var end = moment(task.finish_date);
        if (start > now) {
          task.taskStatus = 1;
        } else {
          if (end >= now) {
            task.taskStatus = 0;
          } else {
            task.taskStatus = -1;
          }
        }
      }
      yield put({
        type: SET_LIST_TASK,
        value: _res.data
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

export function* getSubjectList() {
  try {
    const state = yield select(getClassState);
    const _res = yield call(services.GET, API_BASE_URL_DEV + API_PATH.subject + '/class/' + state.classInfo.id, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: GET_SUBJECT_LIST_SUCCESS,
        value: _res.data.data
      });
    } else {
      console.log(_res.data.message);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* addTask() {
  const taskState = yield select(getTaskState);
  const classState = yield select(getClassState);
  const addTaskState = taskState.formAddTask;
  let param = {
    subject: addTaskState.subject,
    class_id: classState.classInfo.id,
    title: addTaskState.name,
    notes: addTaskState.description,
    start_date: addTaskState.startDate,
    finish_date: addTaskState.endDate,
    task_link: addTaskState.link
  };
  const createTask = yield call(services.PUT, API_BASE_URL_DEV + API_PATH.task, param, HeaderAuth());
  if (createTask.status === 200) {
    if (addTaskState.files.length > 0) {
      var data = new FormData();
      for (const file of addTaskState.files) {
        data.append('files', file);
      }
      const sendFile = yield call(
        services.PUT,
        API_BASE_URL_DEV + API_PATH.task + '/' + createTask.data.data.id + '/files',
        data,
        HeaderFile()
      );
      if (sendFile.status === 200) {
        yield put({
          type: SUCCESS_ADD_TASK
        });
        yield* getTask(classState.classInfo.id);
      } else {
        yield put({
          type: ERROR_TASK,
          value: sendFile.data.message
        });
      }
    } else {
      yield put({
        type: SUCCESS_ADD_TASK
      });
      yield* getTask(classState.classInfo.id);
    }
  } else {
    yield put({
      type: ERROR_TASK,
      value: createTask.data.message
    });
  }
}

export function* deleteTask(action) {
  try {
    const _res = yield call(services.DELETE, API_BASE_URL_DEV + API_PATH.task + '/' + action.id, HeaderAuth());
    if (_res.status === 200) {
      const classState = yield select(getClassState);
      yield* getTask(classState.classInfo.id);
    } else {
      yield put({
        type: ERROR_TASK,
        value: _res.data.message
      });
    }
  } catch (err) {
    yield put({
      type: ERROR_TASK,
      value: err.message
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_TASK, getTask),
    takeEvery(ADD_NEW_TASK, addTask),
    takeEvery(GET_SUBJECT_LIST, getSubjectList),
    takeEvery(DELETE_TASK, deleteTask)
  ]);
}
