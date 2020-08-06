import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  STUDENT_GET_TASK_LIST,
  STUDENT_GET_TASK_FILE_LIST,
  STUDENT_GET_TASK_FILE_LIST_SUCCESS,
  STUDENT_GET_UPLOADED_FILE_LIST,
  STUDENT_GET_UPLOADED_FILE_LIST_SUCCESS,
  GET_TASK_SISWA_LIST_SUCCESS,
  STUDENT_PUT_COLLECTION,
  STUDENT_PUT_COLLECTION_SUCCESS,
  STUDENT_PUT_COLLECTION_FILES,
  STUDENT_SUBMIT_COLLECTION,
  STUDENT_DOWNLOAD_FILE,
  SET_LOADER,
  SET_MODAL
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
// import { post, get } from "../services";
import * as services from '../services';
import * as actions from '../actions';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { HeaderFile, HeaderLogout, HeaderAuth } from '../services/header';
import moment from 'moment';

const getTaskSiswaState = state => state.taskSiswa;
const getAccountState = state => state.account;

export function* studentGetTaskList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    yield put({
      type: SET_LOADER,
      value: true
    });

    let status = taskSiswa.filter.taskStatus.value;
    let paramStatus = status == '' || status == undefined ? '&status=' : '&status=' + status;

    let paramStartDate =
      taskSiswa.filter.startDate == null
        ? '&start_date='
        : '&start_date=' + moment(taskSiswa.filter.startDate).format('YYYY-MM-DD');
    let paramFinishDate =
      taskSiswa.filter.endDate == null
        ? '&finish_date='
        : '&finish_date=' + moment(taskSiswa.filter.endDate).format('YYYY-MM-DD');
    // console.log('colcol', paramStatus, paramStartDate, paramFinishDate, status)
    const response = yield call(
      services.GET,
      API_BASE_URL_DEV + '/collection?' + paramStatus + paramStartDate + paramFinishDate,
      HeaderAuth()
    );
    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.collection_status = datas.data[i].collection_status;
        obj.finish_date = datas.data[i].finish_date;
        obj.notes = datas.data[i].notes;
        obj.start_date = datas.data[i].start_date;
        obj.subject_name = datas.data[i].subject_name;
        obj.task_collection_id = datas.data[i].task_collection_id;
        obj.task_id = datas.data[i].task_id;
        obj.title = datas.data[i].title;
        obj.checkbox = false;
        // obj.class_name = datas.data[i].class_name;
        obj.publish_date = datas.data[i].publish_date;
        result.push(obj);
      }
      yield put({
        type: GET_TASK_SISWA_LIST_SUCCESS,
        field: 'data',
        value: result
      });
      console.log(result, 'resultll', datas);
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

//create lembar jawaban
export function* studentPutCollection() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    yield put({
      type: SET_LOADER,
      value: true
    });
    let param = {
      task_id: taskSiswa.form.task_id
    };

    const response = yield call(services.PUT, API_BASE_URL_DEV + '/collection', param, HeaderAuth());
    // console.log('studentputcollection', response);
    if (response.status == 200) {
      let datas = response.data;
      let obj = {
        task_collection_id: datas.data.task_collection_id,
        submitted_date: datas.data.submitted_date,
        updated_by: datas.data.updated_by,
        updated_date: datas.data.updated_date,
        student_id: datas.data.student_id,
        status: datas.data.status,
        task_id: datas.data.task_id,
        created_date: datas.data.created_date,
        created_by: datas.data.created_by
      };

      yield put({
        type: STUDENT_PUT_COLLECTION_SUCCESS,
        field: 'dataCollection',
        value: obj
      });
      yield put(actions.setStateModalForm('task_collection_id', datas.data.task_collection_id));
      yield put(actions.setStateModalForm('task_id', datas.data.task_id));
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

// upload file ke lembar jawaban
export function* studentPutCollectionFiles() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    let param = taskSiswa.form.task_collection_id;
    const formData = new FormData();
    if (taskSiswa.form.files.length != 0) {
      for (let i = 0; i < taskSiswa.form.files.length; i++) {
        formData.append('files', taskSiswa.form.files[i]);
      }
    }
    // console.log('paramafiles'. param);
    const response = yield call(services.PUT, API_BASE_URL_DEV + '/collection/' + param + '/files', formData, HeaderAuth());
    if (response.status == 200) {
      success('Files Uploaded Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* studentGetTaskList();
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

// submit lembar jawaban termasuk file uploadnya (merubah status collection)
export function* studentSubmitCollection() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    // console.log(taskSiswa.form.task_collection_ids , "Files Uploaded Successfully")
    if (taskSiswa.form.task_collection_ids.length != 0) {
      for (let i = 0; i < taskSiswa.form.task_collection_ids.length; i++) {
        let param = {
          task_collection_id: taskSiswa.form.task_collection_ids[i]
        };
        const response = yield call(services.POST, API_BASE_URL_DEV + '/collection/submit', param, HeaderAuth());
        if (response.status == 200) {
          success('Task Submitted Successfully');
        }
      }
      yield* studentGetTaskList();
    }
    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

// about taskguru
export function* studentGetTaskFileList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    let task_id = taskSiswa.form.task_id;

    const response = yield call(services.GET, API_BASE_URL_DEV + '/task/' + task_id, HeaderAuth());
    // console.log('studentgettaskfile', response);
    if (response.status == 200) {
      let datas = response.data;
      let files = [];
      if (datas.data.files != null || datas.data.files != undefined) {
        for (let i = 0; i < datas.data.files.length; i++) {
          let obj = {};
          if (datas.data.files[i].status == -1) {
            continue;
          }
          obj.task_file_id = datas.data.files[i].task_file_id;
          obj.filename = datas.data.files[i].filename;
          obj.location = datas.data.files[i].location;
          obj.mime_type = datas.data.files[i].mime_type;
          files.push(obj);
        }
      }
      let result = {
        notes: datas.data.notes,
        files: files
      };

      yield put({
        type: STUDENT_GET_TASK_FILE_LIST_SUCCESS,
        field: 'dataTaskFile',
        value: result
      });
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

// about taskguru
export function* studentDownloadFile() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    let task_file_id = taskSiswa.form.task_id;
    let filename = taskSiswa.form.filename;
    let type = '"' + taskSiswa.form.mime_type + '"';

    const response = yield call(services.GETFILE, API_BASE_URL_DEV + '/task/download/' + task_file_id, HeaderFile());
    // console.log('studentdownloadfile', response);
    if (response.status == 200) {
      let fileDownload = response.data;
      // console.log('tipe',type)
      window.URL = window.URL || window.webkitURL;
      const blob = new Blob([fileDownload], { type: type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } else if (response.status == 404) {
      fail('File /s not found');
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

// about collection
export function* studentGetUploadedFileList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskSiswa = yield select(getTaskSiswaState);
    let task_collection_id = taskSiswa.form.task_collection_id;

    const response = yield call(services.GET, API_BASE_URL_DEV + '/collection/' + task_collection_id, HeaderAuth());
    // console.log('studentgetuploadedfile', response);
    if (response.status == 200) {
      let datas = response.data;
      let uploadedFiles = [];
      if (datas.data.files != null || datas.data.files != undefined) {
        for (let i = 0; i < datas.data.files.length; i++) {
          let obj = {};
          obj.task_collection_file_id = datas.data.files[i].task_collection_file_id;
          obj.task_collection_id = datas.data.files[i].task_collection_id;
          obj.filename = datas.data.files[i].filename;
          obj.location = datas.data.files[i].location;
          obj.ext = datas.data.files[i].ext;
          uploadedFiles.push(obj);
        }
      }
      let result = {
        task_id: datas.data.task_id,
        files: uploadedFiles
      };

      yield put({
        type: STUDENT_GET_UPLOADED_FILE_LIST_SUCCESS,
        field: 'dataUploadedFile',
        value: result
      });
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    // console.log(error)
    fail(error);
    yield put({
      type: SET_LOADER,
      value: false
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(STUDENT_GET_TASK_LIST, studentGetTaskList),
    takeEvery(STUDENT_GET_TASK_FILE_LIST, studentGetTaskFileList),
    takeEvery(STUDENT_GET_UPLOADED_FILE_LIST, studentGetUploadedFileList),
    takeEvery(STUDENT_PUT_COLLECTION, studentPutCollection),
    takeEvery(STUDENT_PUT_COLLECTION_FILES, studentPutCollectionFiles),
    takeEvery(STUDENT_SUBMIT_COLLECTION, studentSubmitCollection),
    takeEvery(STUDENT_DOWNLOAD_FILE, studentDownloadFile)
  ]);
}
