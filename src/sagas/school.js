import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  GET_SCHOOL,
  SET_SCHOOL_DATA,
  SUCCESS_UPDATE_SCHOOL,
  SAVE_UPDATE_SCHOOL,
  FAILED_UPDATE_SCHOOL,
  DELETE_SCHOOL,
  REMOVE_SCHOOL_DATA,
  SET_SCHOOL_AUTHORITY,
  DELETE_SCHOOL_FAILED,
  UPDATE_SCHOOL_SPINNER,
  GET_SCHOOL_CLASS,
  SET_LIST_CLASS,
  CONNECT_CLASS_FROM_SCHOOL,
  SCHOOL_CREATE_CLASS,
  SUCCESS_CONNECT_CLASS,
  FAILED_CONNECT_CLASS,
  SUCCESS_CREATE_SCHOOL_CLASS,
  FAILED_CREATE_SCHOOL_CLASS,
  CHANGE_LINK_STATUS,
  APPROVE_JOIN_SCHOOL,
  DECLINE_JOIN_SCHOOL,
  SEARCH_CLASS,
  SET_FILTERED_CLASS,
  GET_SCHOOL_MEMBERS,
  CHANGE_SCHOOL_OWNER,
  SET_SCHOOL_MEMBERS,
  SUCCESS_CHANGE_OWNER,
  FAILED_CHANGE_OWNER,
  REMOVE_SCHOOL_MEMBER,
  SUCCESS_DELETE_MEMBER,
  ADD_SCHOOL_MEMBER,
  SUCCESS_ADD_MEMBER,
  FAILED_ADD_MEMBER
} from '../constants/ActionTypes';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { HeaderAuth } from '../services/header';

const getSchoolState = state => state.school;
export function* getSchoolInfo(action) {
  const _res = yield call(services.GET, API_BASE_URL_DEV + API_PATH.school + '/' + action.value, HeaderAuth());
  if (_res.status === 200) {
    yield put({
      type: SET_SCHOOL_DATA,
      value: _res.data.data
    });
    console.log(_res.data.hasAuthority);
    yield put({
      type: SET_SCHOOL_AUTHORITY,
      value: _res.data.hasAuthority
    });
  } else {
    //SCHOOL NOT FOUND
    window.location.href = process.env.PUBLIC_URL + '/404';
  }
}

export function* updateSchool() {
  yield put({
    type: UPDATE_SCHOOL_SPINNER,
    value: true
  });
  const state = yield select(getSchoolState);
  const modal = state.modal;
  let param = {
    id: state.data.id,
    name: modal.name,
    address: modal.address,
    zipcode: modal.zipcode,
    phone: modal.phone,
    avatar: modal.avatar
  };
  const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.school, param, HeaderAuth());
  if (_res.status === 200) {
    yield put({
      type: SUCCESS_UPDATE_SCHOOL
    });
  } else {
    yield put({
      type: FAILED_UPDATE_SCHOOL,
      value: _res.data.message
    });
  }
}

export function* removeSchool() {
  const state = yield select(getSchoolState);
  const schoolId = state.data.id;
  try {
    const _res = yield call(services.DELETE, API_BASE_URL_DEV + API_PATH.school + '/' + schoolId, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: REMOVE_SCHOOL_DATA
      });
    } else {
      yield put({
        type: DELETE_SCHOOL_FAILED,
        value: _res.data.message
      });
    }
  } catch (err) {
    yield put({
      type: DELETE_SCHOOL_FAILED,
      value: err
    });
  }
}

export function* getAllClass(action) {
  const state = yield select(getSchoolState);
  try {
    const _res = yield call(
      services.GET,
      API_BASE_URL_DEV + API_PATH.school + '/class_list?schoolId=' + action.value + '&filter=' + state.filter,
      HeaderAuth()
    );
    if (_res.status === 200) {
      yield put({
        type: SET_LIST_CLASS,
        value: _res.data.listClass
      });
      yield put({
        type: SET_FILTERED_CLASS,
        value: _res.data.listClass
      });
    } else {
      console.log(_res.data.message);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* connectClass() {
  try {
    const state = yield select(getSchoolState);
    let param = {
      code: state.connectClassModal.code,
      m_school_id: state.data.id
    };
    const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.school + '/connect_class', param, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: SUCCESS_CONNECT_CLASS,
        value: _res.data
      });
      console.log(_res.data);
    } else {
      yield put({
        type: FAILED_CONNECT_CLASS,
        value: _res.data.message
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* createClass() {
  try {
    const state = yield select(getSchoolState);
    const createState = state.createClassModal;
    let param = {
      m_school_id: state.data.id,
      name: createState.name,
      description: createState.description
    };
    const _res = yield call(services.PUT, API_BASE_URL_DEV + API_PATH.school + '/create_class', param, HeaderAuth());

    if (_res.status === 200) {
      console.log(_res.data);
      yield put({
        type: SUCCESS_CREATE_SCHOOL_CLASS,
        value: _res.data
      });
    } else {
      yield put({
        type: FAILED_CREATE_SCHOOL_CLASS,
        value: _res.data.message
      });
    }
  } catch (err) {}
}

export function* updateLinkStatus(action) {
  let param = {
    status: action.value
  };
  const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.school + '/approval/' + action.id, param, HeaderAuth());
  if (_res.status === 200) {
    if (action.value === true) {
      yield put({
        type: APPROVE_JOIN_SCHOOL,
        field: action.id
      });
    } else {
      yield put({
        type: DECLINE_JOIN_SCHOOL,
        field: action.id
      });
    }
  }
}

export function* getFilteredClassList() {
  const state = yield select(getSchoolState);
  if (state.filter == '') {
    yield put({
      type: SET_FILTERED_CLASS,
      value: state.listClass
    });
  } else {
    try {
      const _res = yield call(
        services.GET,
        API_BASE_URL_DEV + API_PATH.school + '/class_list?schoolId=' + state.data.id + '&filter=' + state.filter,
        HeaderAuth()
      );
      if (_res.status === 200) {
        yield put({
          type: SET_FILTERED_CLASS,
          value: _res.data.listClass
        });
      } else {
        console.log(_res.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

export function* getSchoolMembers(action) {
  try {
    const _res = yield call(services.GET, API_BASE_URL_DEV + API_PATH.school + '/members/' + action.id, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: SET_SCHOOL_MEMBERS,
        list: _res.data.listMembers,
        value: _res.data.isOwner
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* changeOwner(action) {
  const state = yield select(getSchoolState);
  let param = {
    id: action.id,
    school_id: state.data.id
  };
  try {
    const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.school + '/change_owner', param, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: SUCCESS_CHANGE_OWNER,
        newOwnerId: _res.data.new_owner_id,
        oldOwnerId: _res.data.old_owner_id
      });
    } else {
      yield put({
        type: FAILED_CHANGE_OWNER,
        value: _res.data.message
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* removeMember(action) {
  let param = {
    id: action.id
  };
  try {
    const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.school + '/remove_member', param, HeaderAuth());
    if (_res.status === 200) {
      yield put({
        type: SUCCESS_DELETE_MEMBER,
        field: action.id,
        value: _res.data.changeAuthority
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}

export function* addMember() {
  const state = yield select(getSchoolState);
  let param = {
    email: state.addMemberModal.email,
    school_id: state.data.id
  };
  const _res = yield call(services.POST, API_BASE_URL_DEV + API_PATH.school + '/add_member', param, HeaderAuth());
  if (_res.status === 200) {
    yield put({
      type: SUCCESS_ADD_MEMBER,
      value: _res.data.message
    });
  } else {
    yield put({
      type: FAILED_ADD_MEMBER,
      value: _res.data.message
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(GET_SCHOOL, getSchoolInfo),
    takeEvery(SAVE_UPDATE_SCHOOL, updateSchool),
    takeEvery(DELETE_SCHOOL, removeSchool),
    takeEvery(GET_SCHOOL_CLASS, getAllClass),
    takeEvery(CONNECT_CLASS_FROM_SCHOOL, connectClass),
    takeEvery(SCHOOL_CREATE_CLASS, createClass),
    takeEvery(CHANGE_LINK_STATUS, updateLinkStatus),
    takeEvery(SEARCH_CLASS, getFilteredClassList),
    takeEvery(GET_SCHOOL_MEMBERS, getSchoolMembers),
    takeEvery(CHANGE_SCHOOL_OWNER, changeOwner),
    takeEvery(REMOVE_SCHOOL_MEMBER, removeMember),
    takeEvery(ADD_SCHOOL_MEMBER, addMember)
  ]);
}
