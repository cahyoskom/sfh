import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_SUCCESS,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  SET_LOADER,
  SET_MODAL,
  POST_TASK,
  ADMIN_GET_GROUP_LIST,
  ADMIN_GET_GROUP_LIST_SUCCESS,
  ADMIN_GET_USER_LIST,
  ADMIN_GET_USER_LIST_SUCCESS,
  ADMIN_GET_SUBJECT_LIST,
  ADMIN_GET_SUBJECT_LIST_SUCCESS,
  ADMIN_GET_CLASS_LIST,
  ADMIN_GET_CLASS_LIST_SUCCESS,
  ADMIN_GET_STUDENT_LIST,
  ADMIN_GET_STUDENT_LIST_SUCCESS,
  ADMIN_GET_ROLE_LIST,
  ADMIN_GET_ROLE_LIST_SUCCESS,
  ADMIN_GET_ROLE_BY_USER_ID,
  ADMIN_GET_USER_BY_ID,
  ADMIN_GET_DATASOURCE_CLASS,
  ADMIN_GET_DATASOURCE_CLASS_SUCCESS,
  ADMIN_GET_DATASOURCE_GROUP,
  ADMIN_GET_DATASOURCE_GROUP_SUCCESS,
  ADMIN_GET_DATASOURCE_SUBJECT,
  ADMIN_GET_DATASOURCE_SUBJECT_SUCCESS,
  ADMIN_GET_DATASOURCE_STUDENT,
  ADMIN_GET_DATASOURCE_STUDENT_SUCCESS,
  ADMIN_CREATE_USER,
  ADMIN_CREATE_STUDENT,
  ADMIN_CREATE_CLASS,
  ADMIN_CREATE_SUBJECT,
  ADMIN_SIGN_USER_ROLE
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';
import moment from 'moment';

const adminState = state => state.admin;
const getTaskGuruState = state => state.taskGuru;

export function* adminGetGroupList() {
  try {
    const admin = yield select(adminState);

    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/group', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.group_id = datas.data[i].group_id;
        obj.group_name = datas.data[i].group_name;
        obj.status = datas.data[i].status;
        obj.created_date = datas.data[i].created_date;
        obj.created_by = datas.data[i].created_by;
        obj.updated_date = datas.data[i].updated_date;
        obj.updated_by = datas.data[i].updated_by;
        result.push(obj);
      }
      // console.log('ressss', result);
      yield put({
        type: ADMIN_GET_GROUP_LIST_SUCCESS,
        field: 'dataGroup',
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

export function* adminGetUserList() {
  try {
    const admin = yield select(adminState);

    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/user', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.no = i + 1;
        obj.user_id = datas.data[i].user_id;
        obj.user_name = datas.data[i].user_name;
        obj.status = datas.data[i].status;
        obj.email = datas.data[i].email;
        result.push(obj);
      }
      // console.log('ressss', result);
      yield put({
        type: ADMIN_GET_USER_LIST_SUCCESS,
        field: 'dataUser',
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

//for user_perid data
export function* adminGetUserById() {
  try {
    const admin = yield select(adminState);

    yield put({
      type: SET_LOADER,
      value: true
    });

    let id = admin.user.formRole.user_id;

    const response = yield call(services.GET, API_BASE_URL_DEV + '/user/' + id, HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;

      let obj = {};
      obj.user_id = datas.data.user_id;
      obj.user_name = datas.data.user_name;
      obj.email = datas.data.email;
      console.log('ressss', obj);
      yield put({
        type: ADMIN_GET_USER_LIST_SUCCESS,
        field: 'dataUserById',
        value: obj
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

export function* adminGetSubjectList() {
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
        obj.subject_name = datas.data[i].subject_name;
        obj.subject_id = datas.data[i].subject_id;
        obj.status = datas.data[i].subject_id;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_SUBJECT_LIST_SUCCESS,
        field: 'dataSubject',
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

export function* adminGetClassList() {
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
        obj.class_name = datas.data[i].class_name;
        obj.class_id = datas.data[i].class_id;
        obj.class_level = datas.data[i].class_level;
        obj.class_parallel = datas.data[i].class_parallel;
        obj.status = datas.data[i].status;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_CLASS_LIST_SUCCESS,
        field: 'dataClass',
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

export function* adminGetStudentList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/student', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.student_name = datas.data[i].student_name;
        obj.student_id = datas.data[i].student_id;
        obj.student_no = datas.data[i].student_no;
        obj.class_id = datas.data[i].class_id;
        obj.status = datas.data[i].status;
        obj.sex = datas.data[i].sex;
        obj.no = i + 1;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_STUDENT_LIST_SUCCESS,
        field: 'dataStudent',
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

export function* adminGetRoleList() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/role', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.user_role_id = datas.data[i].user_role_id;
        obj.user_id = datas.data[i].user_id;
        obj.group_id = datas.data[i].group_id;
        obj.class_id = datas.data[i].class_id;
        obj.subject_id = datas.data[i].subject_id;
        obj.student_id = datas.data[i].student_id;
        obj.status = datas.data[i].status;
        obj.no = i + 1;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_ROLE_LIST_SUCCESS,
        field: 'dataRole',
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

//for user_perid data
export function* adminGetRoleByUserId() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const admin = yield select(adminState);
    let user_id = admin.user.formRole.user_id;

    const response = yield call(services.GET, API_BASE_URL_DEV + '/role/user/' + user_id, HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.group_id = datas.data[i].group_id;
        obj.group_name = datas.data[i].group_name;
        obj.class_id = datas.data[i].class_id;
        obj.class_name = datas.data[i].class_name;
        obj.subject_id = datas.data[i].subject_id;
        obj.subject_name = datas.data[i].subject_name;
        obj.student_id = datas.data[i].student_id;
        obj.student_no = datas.data[i].student_no;
        obj.student_name = datas.data[i].student_name;
        obj.student_class_id = datas.data[i].student_class_id;
        obj.sex = datas.data[i].sex;
        obj.no = i + 1;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_ROLE_LIST_SUCCESS,
        field: 'dataRoleById',
        value: result
      });
      console.log('ccc', result);
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

export function* adminCreateUser() {
  try {
    const admin = yield select(adminState);
    const form = admin.user.form;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      user_name: form.user_name,
      email: form.email,
      password: form.password
    };
    // console.log('par',params);
    const _response = yield call(services.PUT, API_BASE_URL_DEV + '/user', params, HeaderAuth());
    if (_response.status == 200) {
      success('New User Added Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* adminGetUserList();
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

export function* adminCreateClass() {
  try {
    const admin = yield select(adminState);
    const form = admin.class.form;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      class_level: form.class_level,
      class_parallel: form.class_parallel,
      class_name: form.class_name
    };
    // console.log('par',params);
    const _response = yield call(services.PUT, API_BASE_URL_DEV + '/class', params, HeaderAuth());
    if (_response.status == 200) {
      success('New Class Added Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* adminGetClassList();
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

export function* adminCreateSubject() {
  try {
    const admin = yield select(adminState);
    const form = admin.subject.form;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      subject_name: form.subject_name
    };

    const _response = yield call(services.PUT, API_BASE_URL_DEV + '/subject', params, HeaderAuth());
    if (_response.status == 200) {
      success('New Subject Added Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* adminGetSubjectList();
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

export function* adminCreateStudent() {
  try {
    const admin = yield select(adminState);
    const form = admin.student.form;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      student_name: form.student_name,
      student_no: form.student_no,
      sex: form.sex,
      class_id: form.class_id
    };
    // console.log('std', params)
    const _response = yield call(services.PUT, API_BASE_URL_DEV + '/student', params, HeaderAuth());
    if (_response.status == 200) {
      success('New Student Added Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* adminGetStudentList();
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

export function* adminSignUserRole() {
  try {
    const admin = yield select(adminState);
    const form = admin.user.formRole;

    yield put({
      type: SET_LOADER,
      value: true
    });
    let params = {
      user_id: form.user_id,
      group_id: form.group_id,
      class_id: form.class_id == '' ? null : form.class_id,
      subject_id: form.subject_id == '' ? null : form.subject_id,
      student_id: form.student_id == '' ? null : form.student_id
    };
    console.log('std', params);
    const _response = yield call(services.PUT, API_BASE_URL_DEV + '/role', params, HeaderAuth());
    if (_response.status == 200) {
      success('Role Assigned Successfully');
      yield put({
        type: SET_MODAL,
        field: 'show',
        value: false
      });
      yield* adminGetUserList();
      yield* adminGetUserById();
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

//////// datasource section -> for data list input select
export function* AdminGetDataSourceClass() {
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
        type: ADMIN_GET_DATASOURCE_CLASS_SUCCESS,
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

export function* AdminGetDataSourceGroup() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/group', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.label = datas.data[i].group_name;
        obj.value = datas.data[i].group_id;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_DATASOURCE_GROUP_SUCCESS,
        field: 'dataSourceGroup',
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

export function* AdminGetDataSourceSubject() {
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
        type: ADMIN_GET_DATASOURCE_SUBJECT_SUCCESS,
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

export function* AdminGetDataSourceStudent() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });

    const response = yield call(services.GET, API_BASE_URL_DEV + '/student', HeaderAuth());

    if (response.status == 200) {
      let datas = response.data;
      let result = [];
      for (let i = 0; i < datas.data.length; i++) {
        let obj = {};
        obj.label = datas.data[i].student_name;
        obj.value = datas.data[i].student_id;
        result.push(obj);
      }
      yield put({
        type: ADMIN_GET_DATASOURCE_STUDENT_SUCCESS,
        field: 'dataSourceStudent',
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
    takeEvery(ADMIN_GET_GROUP_LIST, adminGetGroupList),
    takeEvery(ADMIN_GET_USER_LIST, adminGetUserList),
    takeEvery(ADMIN_GET_USER_BY_ID, adminGetUserById),
    takeEvery(ADMIN_GET_SUBJECT_LIST, adminGetSubjectList),
    takeEvery(ADMIN_GET_CLASS_LIST, adminGetClassList),
    takeEvery(ADMIN_GET_STUDENT_LIST, adminGetStudentList),
    takeEvery(ADMIN_GET_ROLE_LIST, adminGetRoleList),
    takeEvery(ADMIN_GET_ROLE_BY_USER_ID, adminGetRoleByUserId),
    takeEvery(ADMIN_GET_DATASOURCE_CLASS, AdminGetDataSourceClass),
    takeEvery(ADMIN_GET_DATASOURCE_GROUP, AdminGetDataSourceGroup),
    takeEvery(ADMIN_GET_DATASOURCE_SUBJECT, AdminGetDataSourceSubject),
    takeEvery(ADMIN_GET_DATASOURCE_STUDENT, AdminGetDataSourceStudent),
    takeEvery(ADMIN_CREATE_USER, adminCreateUser),
    takeEvery(ADMIN_CREATE_CLASS, adminCreateClass),
    takeEvery(ADMIN_CREATE_SUBJECT, adminCreateSubject),
    takeEvery(ADMIN_CREATE_STUDENT, adminCreateStudent),
    takeEvery(ADMIN_SIGN_USER_ROLE, adminSignUserRole)
  ]);
}
