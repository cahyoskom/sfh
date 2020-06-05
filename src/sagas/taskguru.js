import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
    GET_TASK_GURU_LIST,
    GET_TASK_GURU_LIST_SUCCESS,
    GET_SUBJECT_LIST,
    GET_SUBJECT_LIST_SUCCESS,
    GET_CLASS_LIST,
    GET_CLASS_LIST_SUCCESS,
    SET_LOADER,
    SET_MODAL,
    POST_TASK
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";
import moment from 'moment'

const getTaskGuruState = state => state.taskGuru;

export function* getTaskGuruList() {
    try {
        const taskGuru = yield select(getTaskGuruState)

        yield put({
            type: SET_LOADER,
            value: true
        });
        let param = {
            class: taskGuru.filter.class_id,
            subject: taskGuru.filter.subject_id,
            start_date: moment(taskGuru.filter.start_date).format("YYYY-MM-DD"),
            end_date: moment(taskGuru.filter.end_date).format("YYYY-MM-DD"),
        };console.log('varam',param);
        const response = yield call(services.GET, API_BASE_URL_DEV + "/task?class=" + param.class + "&subject=" + param.subject, HeaderAuth());

        if(response.status == 200){
            let data = response.data;
            yield put({ 
                type: GET_TASK_GURU_LIST_SUCCESS, 
                field: "data",
                // payload: response 
                value: data.data
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

export function* getSubjectList() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        
        const response = yield call(services.GET, API_BASE_URL_DEV + "/subject", HeaderAuth());

        if(response.status == 200){            
            let datas = response.data;
            let result = [];
            for (let i=0; i < datas.data.length; i++) {
                let obj = {};
                obj.label = datas.data[i].subject_name;
                obj.value = datas.data[i].subject_id;
                result.push(obj);
            }
            yield put({ 
                type: GET_SUBJECT_LIST_SUCCESS, 
                field: "dataSourceSubject",
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

export function* getClassList() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        
        const response = yield call(services.GET, API_BASE_URL_DEV + "/class", HeaderAuth());

        if(response.status == 200){            
            let datas = response.data;
            let result = [];
            for (let i=0; i < datas.data.length; i++) {
                let obj = {};
                obj.label = datas.data[i].class_name;
                obj.value = datas.data[i].class_id;
                result.push(obj);
            }
            yield put({ 
                type: GET_CLASS_LIST_SUCCESS, 
                field: "dataSourceClass",
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

export function* postTask() {
    try {
      const taskGuruState = yield select(getTaskGuruState);
      const form = taskGuruState.form;
  
      yield put({
        type: SET_LOADER,
        value: true
      });
      let params = 
        {
            assignor_id: taskGuruState.assignor_id,
            class_id: form.class_id,
            subject_id: form.subject_id,
            title: form.title,
            notes: form.notes,
            //   weight: form.weight,
            weight: 5,
            start_date: moment(form.start_date).format("YYYY-MM-DD"),
            finish_date: moment(form.finish_date).format("YYYY-MM-DD"),
            publish_date: moment(form.publish_date).format("YYYY-MM-DD")
        };
  console.log('par',params);
      const _response = yield call(services.PUT, API_BASE_URL_DEV + "/task", params, HeaderAuth());
  
      if (_response.status == 200) {
        success("New Task Added Successfully");
        yield put({
          type: SET_MODAL,
          field: "show",
          value: false
        })
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

export default function* rootSaga() {
  yield all([
      takeEvery(GET_TASK_GURU_LIST, getTaskGuruList),
      takeEvery(GET_SUBJECT_LIST, getSubjectList),
      takeEvery(GET_CLASS_LIST, getClassList),
      takeEvery(POST_TASK, postTask)
    ]);
}
