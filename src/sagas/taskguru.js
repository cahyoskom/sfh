import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  GET_TASK_GURU_LIST,
  GET_TASK_GURU_LIST_SUCCESS,
  GURU_GET_TASK_COLLECTION_LIST,
  GURU_GET_TASK_COLLECTION_LIST_SUCCESS,
  GURU_GET_UPLOADED_COLLECTION_LIST,
  GURU_GET_UPLOADED_COLLECTION_LIST_SUCCESS,
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_SUCCESS,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  SET_LOADER,
  SET_MODAL,
  POST_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ARCHIVED_TASK,
  GET_TASK_GURU_BY_ID,
  GURU_DELETE_TASK_FILE,
  SET_MODAL_EDIT_FORM_GURU,
  GURU_DOWNLOAD_COLLECTION
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { HeaderFile, HeaderAuth } from '../services/header';
import moment from 'moment';
import { setStateModalForm, setModal } from '../actions';

const getTaskGuruState = state => state.taskGuru;
const getAccountState = state => state.account;

export function* getTaskGuruList() {
  try {
    const taskGuru = yield select(getTaskGuruState);
    const account = yield select(getAccountState);

    yield put({
      type: SET_LOADER,
      value: true
    });
    //param class
    let classes = taskGuru.filter.class_id;
    let paramClass = '&class=';

    if (classes.length != 0) {
      let kelas = [];
      let optional = '';
      for (let i = 0; i < classes.length; i++) {
        kelas.push(classes[i].value);
        optional += '&class=' + kelas[i];
      }
      paramClass = optional;
    }
    //param subject
    let subjects = taskGuru.filter.subject_id;
    let paramSubject = subjects != '' ? '&subject=' + subjects : '&subject=';

    // if(subjects.length != 0){
    //   let subject = [];
    //   let optional = "";
    //   for(let i=0; i<subjects.length; i++ ){
    //       subject.push(subjects[i].value)
    //       optional +="&subject=" + subject[i];
    //   }
    //   paramSubject = optional;
    // }

    let paramStartDate =
      taskGuru.filter.start_date == null
        ? '&start_date='
        : '&start_date=' + moment(taskGuru.filter.start_date).format('YYYY-MM-DD');
    let paramFinishDate =
      taskGuru.filter.finish_date == null
        ? '&finish_date='
        : '&finish_date=' + moment(taskGuru.filter.finish_date).format('YYYY-MM-DD');
    console.log('xxxxxx', taskGuru.filter);
    // let param = {
    //     class: taskGuru.filter.class_id,
    //     subject: taskGuru.filter.subject_id,
    //     start_date: moment(taskGuru.filter.start_date).format("YYYY-MM-DD"),
    //     end_date: moment(taskGuru.filter.end_date).format("YYYY-MM-DD"),
    // };
    // console.log("param",param);
    // const response = yield call(services.GET, API_BASE_URL_DEV + "/task?class=" + param.class + "&subject=" + param.subject + optional, HeaderAuth());
    // const response = yield call(services.GET, API_BASE_URL_DEV + "/task?" + paramClass + "&subject=" + param.subject, HeaderAuth());
    const response = yield call(
      services.GET,
      API_BASE_URL_DEV + '/task?' + paramClass + paramSubject + paramStartDate + paramFinishDate,
      HeaderAuth()
    );

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.status = true;
        obj.task_id = datas.data[i].task_id;
        obj.assignor_id = datas.data[i].assignor_id;
        obj.class_id = datas.data[i].class_id;
        obj.subject_id = datas.data[i].subject_id;
        obj.class_name = datas.data[i].class_name;
        obj.subject_name = datas.data[i].subject_name;
        obj.notes = datas.data[i].notes;
        obj.title = datas.data[i].title;
        obj.start_date = datas.data[i].start_date;
        obj.finish_date = datas.data[i].finish_date;
        result.push(obj);
      }
      // console.log('ressss', result);
      yield put({
        type: GET_TASK_GURU_LIST_SUCCESS,
        field: 'data',
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

export function* guruGetTaskCollectionList() {
  try {
    const taskGuru = yield select(getTaskGuruState);

    yield put({
      type: SET_LOADER,
      value: true
    });

    let task_id = taskGuru.params;
    // console.log('par',task_id)
    const response = yield call(services.GET, API_BASE_URL_DEV + '/task/' + task_id + '/collection', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      // console.log("L", datas)
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.status = datas.data[i].status;
        obj.student_name = datas.data[i].student_name;
        obj.student_no = datas.data[i].student_no;
        obj.submitted_date = datas.data[i].submitted_date;
        obj.task_collection_id = datas.data[i].task_collection_id;
        // obj.task_progress = "";
        result.push(obj);
      }
      // console.log('ressss', result);
      yield put({
        type: GURU_GET_TASK_COLLECTION_LIST_SUCCESS,
        field: 'dataCollection',
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

export function* getTaskGuruById() {
  try {
    const taskGuru = yield select(getTaskGuruState);
    const account = yield select(getAccountState);

    yield put({
      type: SET_LOADER,
      value: true
    });

    let task_id = taskGuru.form.task_id;
    // console.log("task_id",task_id);
    const response = yield call(services.GET, API_BASE_URL_DEV + '/task/' + task_id, HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      if (datas.data.files != undefined || datas.data.files.length != 0) {
        // let result = {};
        let files = [];
        for (let i = 0; i < datas.data.files.length; i++) {
          let obj = {};
          if (datas.data.files[i].status == -1) {
            continue;
          }
          obj.task_file_id = datas.data.files[i].task_file_id;
          obj.filename = datas.data.files[i].filename;
          files.push(obj);
        }

        let result = {
          files: files,
          task_id: datas.data.task_id,
          assignor_id: datas.data.assignor_id,
          class_id: datas.data.class_id,
          subject_id: datas.data.subject_id,
          class_name: datas.data.class_name,
          subject_name: datas.data.subject_name,
          notes: datas.data.notes,
          title: datas.data.title,
          start_date: datas.data.start_date,
          finish_date: datas.data.finish_date
        };

        // console.log('ressss', result);
        yield put({
          type: SET_MODAL_EDIT_FORM_GURU,
          payload: result
        });
      }
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

export function* getSubjectList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const response = yield call(services.GET, API_BASE_URL_DEV + '/subject', HeaderAuth());
    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.label = datas.data[i].subject_name;
        obj.value = datas.data[i].subject_id;
        result.push(obj);
      }
      yield put({
        type: GET_SUBJECT_LIST_SUCCESS,
        field: 'dataSourceSubject',
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

export function* getClassList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/class', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.label = datas.data[i].class_name;
        obj.value = datas.data[i].class_id;
        result.push(obj);
      }
      yield put({
        type: GET_CLASS_LIST_SUCCESS,
        field: 'dataSourceClass',
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

export function* postTask() {
  try {
    const taskGuruState = yield select(getTaskGuruState);
    const form = taskGuruState.form;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      assignor_id: taskGuruState.assignor_id,
      class_id: form.class_id,
      subject_id: form.subject_id,
      title: form.title,
      notes: form.notes,
      //   weight: form.weight,
      weight: 5,
      start_date: moment(form.start_date).format('YYYY-MM-DD'),
      finish_date: moment(form.finish_date).format('YYYY-MM-DD'),
      publish_date: moment(form.publish_date).format('YYYY-MM-DD'),
      files: form.files
    };

    const _response = yield call(services.PUT, API_BASE_URL_DEV + '/task', params, HeaderAuth());

    if (_response.status == 200) {
      if (form.files != null || form.files != undefined) {
        let datas = _response.data;
        let task_id = datas.data.task_id;

        const formData = new FormData();
        // formData.append("files", form.files);
        for (let i = 0; i < form.files.length; i++) {
          formData.append('files', form.files[i]);
        }
        // console.log('ffaaaiill', form.files[0]);
        const response = yield call(services.PUT, API_BASE_URL_DEV + '/task/' + task_id + '/files', formData, HeaderAuth());
        if (response.status == 200) {
          // console.log('respon formdata',response);
        }
      }
      success('New Task Added Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* getTaskGuruList();
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function* updateTask() {
  try {
    const taskGuruState = yield select(getTaskGuruState);
    const form = taskGuruState.form;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      task_id: form.task_id,
      assignor_id: form.assignor_id,
      class_id: form.class_id,
      subject_id: form.subject_id,
      title: form.title,
      notes: form.notes,
      //   weight: form.weight,
      weight: 5,
      start_date: moment(form.start_date).format('YYYY-MM-DD'),
      finish_date: moment(form.finish_date).format('YYYY-MM-DD'),
      publish_date: moment(form.publish_date).format('YYYY-MM-DD')
    };

    const _response = yield call(services.POST, API_BASE_URL_DEV + '/task', params, HeaderAuth());

    if (_response.status == 200) {
      if (form.files != null || form.files != undefined) {
        let datas = _response.data;
        let task_id = datas.data.task_id;

        const formData = new FormData();
        // formData.append("files", form.files);
        for (let i = 0; i < form.files.length; i++) {
          formData.append('files', form.files[i]);
        }
        // console.log('ffaaaiill', form.files[0]);
        const response = yield call(services.PUT, API_BASE_URL_DEV + '/task/' + task_id + '/files', formData, HeaderAuth());
        if (response.status == 200) {
          // console.log('respon formdata',response);
        }
      }
      success('Task Updated Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* getTaskGuruList();
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function* deleteTask() {
  try {
    const taskGuruState = yield select(getTaskGuruState);
    const deleteIds = taskGuruState.form.task_id;
    yield put({
      type: SET_LOADER,
      value: true
    });
    const _response = yield call(services.DELETE, API_BASE_URL_DEV + '/task/' + deleteIds, HeaderAuth());
    if (_response.status === 200) {
      success('Task Successfully Deleted');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* getTaskGuruList();
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function* archivedTask() {
  try {
    const taskGuruState = yield select(getTaskGuruState);
    const archievedIds = taskGuruState.form.task_id;

    yield put({
      type: SET_LOADER,
      value: true
    });

    let param = {
      task_id: archievedIds
    };

    const _response = yield call(services.POST, API_BASE_URL_DEV + '/task/archived', param, HeaderAuth());

    if (_response.status === 200) {
      success('Task Successfully Archived');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* getTaskGuruList();
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function* guruDeleteTaskFile() {
  try {
    const taskGuruState = yield select(getTaskGuruState);
    const form = taskGuruState.form;

    yield put({
      type: SET_LOADER,
      value: true
    });

    let task_id = form.task_id;
    if (form.deleteFileIds != 0 || form.deleteFileIds != undefined || form.deleteFileIds != null) {
      let task_file_id = form.deleteFileIds;
      const _response = yield call(
        services.DELETE,
        API_BASE_URL_DEV + '/task/' + task_id + '/files/' + task_file_id,
        HeaderAuth()
      );
      if (_response.status === 200) {
        success('File Deleted');
      }
      yield* getTaskGuruById();
    }
    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

// about collection
export function* guruGetUploadedCollectionList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskGuru = yield select(getTaskGuruState);
    let task_collection_id = taskGuru.formUploadedCollection.task_collection_id;
    // console.log('swsw', taskGuru)
    const response = yield call(services.GET, API_BASE_URL_DEV + '/collection/' + task_collection_id, HeaderAuth());
    // console.log('guru', response);
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
          obj.mime_type = datas.data.files[i].mime_type;
          uploadedFiles.push(obj);
        }
      }
      let result = {
        task_collection_id: datas.data.task_collection_id,
        files: uploadedFiles
      };

      yield put({
        type: GURU_GET_UPLOADED_COLLECTION_LIST_SUCCESS,
        field: 'dataUploadedCollection',
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

// about collection
export function* guruDownloadCollection() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const taskGuru = yield select(getTaskGuruState);
    let task_collection_file_id = taskGuru.formUploadedCollection.task_collection_file_id;
    let filename = taskGuru.formUploadedCollection.filename;
    let type = '"' + taskGuru.formUploadedCollection.mime_type + '"';

    const response = yield call(
      services.GETFILE,
      API_BASE_URL_DEV + '/collection/download/' + task_collection_file_id,
      HeaderFile()
    );
    // console.log('gurudonlotcollection', response);
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

export default function* rootSaga() {
  yield all([
    takeEvery(GET_TASK_GURU_LIST, getTaskGuruList),
    takeEvery(GURU_GET_TASK_COLLECTION_LIST, guruGetTaskCollectionList),
    takeEvery(GURU_GET_UPLOADED_COLLECTION_LIST, guruGetUploadedCollectionList),
    takeEvery(GURU_DOWNLOAD_COLLECTION, guruDownloadCollection),
    takeEvery(GET_SUBJECT_LIST, getSubjectList),
    takeEvery(GET_CLASS_LIST, getClassList),
    takeEvery(POST_TASK, postTask),
    takeEvery(UPDATE_TASK, updateTask),
    // takeEvery(DELETE_TASK, deleteTask),
    takeEvery(ARCHIVED_TASK, archivedTask),
    takeEvery(GET_TASK_GURU_BY_ID, getTaskGuruById),
    takeEvery(GURU_DELETE_TASK_FILE, guruDeleteTaskFile)
  ]);
}
