import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
    GET_TASK_SISWA_LIST,
    GET_TASK_SISWA_LIST_SUCCESS,
    STUDENT_PUT_COLLECTION,
    STUDENT_PUT_COLLECTION_SUCCESS,
    STUDENT_PUT_COLLECTION_FILES,
    STUDENT_SUBMIT_COLLECTION,
    SET_LOADER,
    SET_MODAL
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
// import { post, get } from "../services";
import * as services from "../services";
import * as actions from "../actions";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderLogout, HeaderAuth } from "../services/header";

const getTaskSiswaState = state => state.taskSiswa;
const getAccountState = state => state.account;

export function* getTaskSiswaList() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        const taskSiswa = yield select(getTaskSiswaState)
        yield put({
                type: SET_LOADER,
                value: true
            });
            let param = {
                class: 1,
                subject: 1
        };
      
        // const response = yield call(services.GET, API_BASE_URL_DEV + "/task?class=" + param.class + "&subject=" + param.subject, HeaderAuth());
        const response = yield call(services.GET, API_BASE_URL_DEV + "/collection", HeaderAuth());
        if(response.status == 200){
            let datas = response.data;
            let result = [];
            for (let i=0; i < datas.data.length; i++) {
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
                result.push(obj);
            }
            yield put({ 
                type: GET_TASK_SISWA_LIST_SUCCESS, 
                field: "data",
                value: result
            });
        }
        
        yield put({
            type: SET_LOADER,
            value: false
          });
    } catch (error) {
        console.log(error)
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
        const taskSiswa = yield select(getTaskSiswaState)
        yield put({
                type: SET_LOADER,
                value: true
            });
            let param = {
                task_id: taskSiswa.form.task_id
            };
      
        const response = yield call(services.PUT, API_BASE_URL_DEV + "/collection", param, HeaderAuth());
        console.log('studentputcollection', response);
        if(response.status == 200){
            let datas = response.data;
            let obj = {
                task_collection_id : datas.data.task_collection_id,
                submitted_date : datas.data.submitted_date,
                updated_by : datas.data.updated_by,
                updated_date : datas.data.updated_date,
                student_id : datas.data.student_id,
                status : datas.data.status,
                task_id : datas.data.task_id,
                created_date : datas.data.created_date,
                created_by : datas.data.created_by,
            };

            yield put({ 
                type: STUDENT_PUT_COLLECTION_SUCCESS, 
                field: "dataCollection",
                value: obj
            });
            yield put(actions.setStateModalForm("task_collection_id", datas.data.task_collection_id));
            yield put(actions.setStateModalForm("task_id", datas.data.task_id));
        }
        
        yield put({
            type: SET_LOADER,
            value: false
          });
    } catch (error) {
        console.log(error)
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
        const taskSiswa = yield select(getTaskSiswaState)

        let param = taskSiswa.form.task_collection_id;
        const formData = new FormData();
        // formData.append("files", form.files);
        if(taskSiswa.form.files.length != 0){
            for(let i = 0; i<taskSiswa.form.files.length; i++){
                formData.append("files", taskSiswa.form.files[i])
            }
        }
        
console.log('paramafiles'. param);
        const response = yield call(services.PUT, API_BASE_URL_DEV + "/collection/" + param + "/files", formData, HeaderAuth());
        if(response.status == 200){
            success("Files Uploaded Successfully");
            yield put({
                type: SET_MODAL,
                field: "show",
                value: false
            })
        }
        
        yield put({
            type: SET_LOADER,
            value: false
          });
    } catch (error) {
        console.log(error)
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
        const taskSiswa = yield select(getTaskSiswaState)
        console.log(taskSiswa.form.task_collection_ids , "Files Uploaded Successfully")
        if(taskSiswa.form.task_collection_ids.length != 0){
            for(let i = 0; i<taskSiswa.form.task_collection_ids.length; i++){
                let param = {
                    task_collection_id : taskSiswa.form.task_collection_ids[i]
                }
                const response = yield call(services.POST, API_BASE_URL_DEV + "/collection/submit", param, HeaderAuth());
                if(response.status == 200){
                    success("Files Uploaded Successfully");
                }
            }
            yield* getTaskSiswaList();
        }        
        yield put({
            type: SET_LOADER,
            value: false
        });
        
    } catch (error) {
        console.log(error)
        fail(error);
        yield put({
            type: SET_LOADER,
            value: false
          });
    }
}

export default function* rootSaga() {
  yield all([
      takeEvery(GET_TASK_SISWA_LIST, getTaskSiswaList),
      takeEvery(STUDENT_PUT_COLLECTION, studentPutCollection),
      takeEvery(STUDENT_PUT_COLLECTION_FILES, studentPutCollectionFiles),
      takeEvery(STUDENT_SUBMIT_COLLECTION, studentSubmitCollection),
    ]);
}
