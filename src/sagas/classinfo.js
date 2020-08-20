import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  SET_CLASS_INFO,
  SET_CLASS_INFO_DATA,
  SET_CLASS_DELETE,
  UPDATE_CLASS_INFO,
  ON_CHANGE_STATE_EDIT_CLASS,
  SET_UPDATE_CLASS_SUCCESS,
  SET_UPDATE_CLASS_FAIL,
  SET_CLASS_DUPLICATE,
  SET_DELETE_CLASS_SUCCESS,
  SET_DELETE_CLASS_FAIL,
  SET_DUPLICATE_CLASS_SUCCESS,
  SET_DUPLICATE_CLASS_FAIL,
  SET_CLASS_MEMBERS,
  SET_CLASS_MEMBERS_DATA,
  SET_UPDATE_MEMBER,
  SET_ADD_MEMBER,
  SET_ADD_MEMBER_FAIL,
  SET_ADD_MEMBER_SUCCESS
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';
import group from '../components/usermanagement/group';
const getClassInfoState = state => state.class;

export function* setclassmembers() {
  try {
    const accountState = yield select(getClassInfoState);
    const classInfoState = accountState.classInfo;
    const classMembersState = accountState.members;
    const classId = classInfoState.id;
    let param = {};
    let url = API_BASE_URL_DEV + API_PATH.getClassMembers + '/' + classId;

    const _response = yield call(services.GET, url, HeaderAuth());
    if (_response.status != 200) {
      fail(_response.data.message);
      return;
    }
    let data = _response.data;

    console.log(data);
    yield put({
      type: SET_CLASS_MEMBERS_DATA,
      value: data
    });
  } catch (error) {
    console.log(error);
    fail(error);
  }
}
export function* setclassinfo() {
  console.log('function called');
  try {
    const accountState = yield select(getClassInfoState);
    const classInfoState = accountState.classInfo;
    const classId = classInfoState.id;
    let param = {};
    let url = API_BASE_URL_DEV + API_PATH.getClassInfo + '/' + classId;

    const _response = yield call(services.GET, url, HeaderAuth());
    if (_response.status != 200) {
      window.location.href = process.env.PUBLIC_URL + '/404';
      return;
    }
    let data = _response.data;
    const schoolId = data.data.m_school_id;
    if (schoolId) {
      try {
        let urlSchool = API_BASE_URL_DEV + API_PATH.getSchoolInfo + '/' + schoolId;
        const _responseSchool = yield call(services.GET, urlSchool, HeaderAuth());
        if (_responseSchool.data.data) {
          console.log(_responseSchool);
          data.data.school = _responseSchool.data.data.name;
          data.data.schoolCode = _responseSchool.data.data.code;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      data.data.school = '';
    }

    console.log(data);
    yield put({
      type: SET_CLASS_INFO_DATA,
      value: data
    });
  } catch (error) {
    console.log(error);
    fail(error);
  }
}
export function* deleteClass() {
  const classState = yield select(getClassInfoState);
  const classInfoState = classState.classInfo;
  const classId = classInfoState.id;
  let param = {};
  let url = API_BASE_URL_DEV + API_PATH.deleteClass + '/' + classId;
  const _response = yield call(services.DELETE, url, HeaderAuth());
  if (_response.status != 200) {
    yield put({
      type: SET_DELETE_CLASS_FAIL,
      value: true,
      field: 'deleteFail'
    });
    return;
  }
  let data = _response.data;
  console.log(data);
  success('kelas berhasil dihapus');
  yield put({
    type: SET_DELETE_CLASS_SUCCESS
  });
  return;
}

export function* duplicateClass() {
  const classState = yield select(getClassInfoState);
  const classInfoState = classState.classInfo;
  const classId = classInfoState.id;
  let param = {};
  let url = API_BASE_URL_DEV + API_PATH.duplicateClass + '/' + classId;
  const _response = yield call(services.PUT, url, param, HeaderAuth());
  if (_response.status != 200) {
    yield put({
      type: SET_DUPLICATE_CLASS_FAIL
    });
    return;
  }
  let data = _response.data;
  console.log(data);
  yield put({
    type: SET_DUPLICATE_CLASS_SUCCESS,
    value: `${process.env.PUBLIC_URL}/class-info/` + data.data.id
  });
}
export function* updateClass() {
  const classState = yield select(getClassInfoState);
  const classInfoState = classState.classInfo;
  const classEditState = classState.editClass;
  let param = {
    id: classInfoState.id,
    name: classEditState.name,
    description: classEditState.description,
    code: classInfoState.code,
    note: classEditState.note
  };
  if (param.name == '') {
    yield put({
      type: ON_CHANGE_STATE_EDIT_CLASS,
      value: 'Nama tidak boleh kosong',
      field: 'errormsg'
    });
    yield put({
      type: ON_CHANGE_STATE_EDIT_CLASS,
      value: true,
      field: 'openAlert'
    });
    return;
  }

  let schoolName = '';

  const schoolCode = classEditState.schoolCode;
  if (schoolCode) {
    let url = API_BASE_URL_DEV + API_PATH.schoolByCode + '/' + schoolCode;
    const schoolResponse = yield call(services.GET, url, HeaderAuth());
    console.log(schoolResponse);
    let schoolData = schoolResponse.data.data;
    if (!schoolData) {
      yield put({
        type: ON_CHANGE_STATE_EDIT_CLASS,
        value: 'Kode Sekolah salah',
        field: 'errormsg'
      });
      yield put({
        type: ON_CHANGE_STATE_EDIT_CLASS,
        value: true,
        field: 'openAlert'
      });
      return;
    } else {
      param.m_school_id = schoolData.id;
      schoolName = schoolData.name;
    }
  } else {
    param.m_school_id = null;
  }
  console.log(param);
  const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.editClass + '/' + param.id, param, HeaderAuth());
  console.log(_res);
  let data = _res.data;
  if (_res.status == 200) {
    data.data.school = schoolName;
    data.data.schoolCode = schoolCode;
    data.hasAuthority = true;
    console.log(data.data);
    yield put({
      type: SET_CLASS_INFO_DATA,
      value: data
    });
    yield put({
      type: SET_UPDATE_CLASS_SUCCESS,
      value: 'Anda telah membuat perubahan pada informasi kelas.'
    });
  } else {
    yield put({
      type: SET_UPDATE_CLASS_FAIL,
      value: 'Mengubah kelas gagal'
    });
  }
  return;
}
export function* setUpdateMember() {
  const classState = yield select(getClassInfoState);
  const classInfoState = classState.classInfo;
  const updateMemberState = classState.updateMember;
  const classId = classInfoState.id;
  const userId = updateMemberState.userId;
  const request = updateMemberState.request;
  console.log(classId + userId + request);
  let param = {
    class: classId,
    user: userId,
    request: request
  };
  const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.updateMember, param, HeaderAuth());
  if (_res.status != 200) {
    fail(_res.data.message);
    console.log(_res);
    return;
  }
  success(_res.data.message);
  yield put({
    type: SET_CLASS_MEMBERS
  });

  return;
}
export function* setAddMember() {
  const classState = yield select(getClassInfoState);
  const classInfoState = classState.classInfo;
  const addMemberState = classState.addMember;
  const email = addMemberState.email;
  const position = addMemberState.position;
  const param = {
    email: email,
    position: position,
    classId: classInfoState.id
  };
  const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.addMember, param, HeaderAuth());
  console.log(_res);
  if (_res.status != 200) {
    yield put({ type: SET_ADD_MEMBER_FAIL });
  }
  success('Undangan berhasil terkirim');
  yield put({
    type: SET_CLASS_MEMBERS
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(SET_CLASS_INFO, setclassinfo),
    takeEvery(SET_CLASS_DELETE, deleteClass),
    takeEvery(UPDATE_CLASS_INFO, updateClass),
    takeEvery(SET_CLASS_DUPLICATE, duplicateClass),
    takeEvery(SET_CLASS_MEMBERS, setclassmembers),
    takeEvery(SET_UPDATE_MEMBER, setUpdateMember),
    takeEvery(SET_ADD_MEMBER, setAddMember)
  ]);
}
