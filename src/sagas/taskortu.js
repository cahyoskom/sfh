import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
    GET_TASK_ORTU_LIST,
    GET_TASK_ORTU_LIST_SUCCESS,
    SET_LOADER
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
// import { post, get } from "../services";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderLogout } from "../services/header";

const getTaskOrtuState = state => state.taskOrtu;

export function* getTaskOrtuList() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        const taskOrtu = yield select(getTaskOrtuState)
        let response = [
            [true, "Mengerjakan soal latihan matematika halaman 1 s/d 5", 1],
            [false, "Membaca dan membuat rangkuman buku IPS halaman 19-28, foto hasil rangkuman lalu upload", 2],
            [false, "Membaca dan membuat rangkuman buku IPA halaman 30-40, foto hasil rangkuman lalu upload", 3]
        ]
        // console.log('ini sagas')
        yield put({ 
            type: GET_TASK_ORTU_LIST_SUCCESS, 
            field: "data",
            // payload: response 
            value: response 
        });
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
      takeEvery(GET_TASK_ORTU_LIST, getTaskOrtuList)
    ]);
}
