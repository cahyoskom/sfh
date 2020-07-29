import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
  SET_CLASS_INFO,
  SET_CLASS_INFO_DATA,
  SET_CLASS_DELETE,
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";
import group from "../components/usermanagement/group";
const getClassInfoState = (state) => state.class;

export function* setclassinfo() {
  console.log("function called");
  try {
    const accountState = yield select(getClassInfoState);
    const classInfoState = accountState.classInfo;
    const classId = classInfoState.id;
    let param = {};
    let url = API_BASE_URL_DEV + API_PATH.getClassInfo + "/" + classId;
    console.log(url);

    const _response = yield call(services.GET, url, param, Header());
    let data = _response.data;
    if (!data.data.note) {
      data.data.note = "";
    }
    const schoolId = data.data.m_school_id;
    if (schoolId) {
      try {
        let urlSchool =
          API_BASE_URL_DEV + API_PATH.getSchoolInfo + "/" + schoolId;
        const _responseSchool = yield call(
          services.GET,
          urlSchool,
          param,
          Header()
        );
        if (_responseSchool) {
          console.log(_responseSchool);
          data.data.school = _responseSchool.data.data.name;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      data.data.school = "Tidak ada sekolah";
    }

    console.log(data);
    yield put({
      type: SET_CLASS_INFO_DATA,
      value: data,
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
  let url = API_BASE_URL_DEV + API_PATH.deleteClass + "/" + classId;
  const _response = yield call(services.DELETE, url, param, Header());
  let data = _response.data;
  console.log(data);
  success("kelas berhasil dihapus");
}

export default function* rootSaga() {
  yield all([
    takeEvery(SET_CLASS_INFO, setclassinfo),
    takeEvery(SET_CLASS_DELETE, deleteClass),
  ]);
}
