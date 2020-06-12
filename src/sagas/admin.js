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

        let classes = taskGuru.filter.class_id;
        let paramClass = "&class=";
        
        if(classes.length != 0){
          let kelas = [];
          let optional = "";
          for(let i=0; i<classes.length; i++ ){
              kelas.push(classes[i].value)
              optional +="&class=" + kelas[i];
          }

          paramClass = optional;
        }
        
        let param = {
            class: taskGuru.filter.class_id,
            subject: taskGuru.filter.subject_id,
            start_date: moment(taskGuru.filter.start_date).format("YYYY-MM-DD"),
            end_date: moment(taskGuru.filter.end_date).format("YYYY-MM-DD"),
        };
        // console.log("param",param);
        // const response = yield call(services.GET, API_BASE_URL_DEV + "/task?class=" + param.class + "&subject=" + param.subject + optional, HeaderAuth());
        const response = yield call(services.GET, API_BASE_URL_DEV + "/task?" + paramClass + "&subject=" + param.subject, HeaderAuth());

        if(response.status == 200){
            let datas = response.data;
            let result = [];
            for (let i=0; i < datas.data.length; i++) {
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

export function* getSubjectList() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        
        const response = yield call(services.GET, API_BASE_URL_DEV + "/subject", HeaderAuth());
console.log('res subject', response)
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
            publish_date: moment(form.publish_date).format("YYYY-MM-DD"),
            files: form.files
        };
  console.log('par',params);
      // const _response = yield call(services.PUT, API_BASE_URL_DEV + "/task", params, HeaderAuth());
  let _response = true;
  if (_response) {
      // if (_response.status == 200) {
// console.log('rez',_response);
//         let datas = _response.data;
//         let task_id = datas.data.task_id
// console.log('createTask', task_id);
        const formData = new FormData();
        for(let i = 0; i<form.files.length; i++){
          formData.append("file", form.files[i])
        }
console.log('pom deta',formData);
console.log('pom deta file',form.files);
for (var pair of formData.entries())
{
  console.log(pair[0]+ ', '+ pair[1]); 
}
console.log('setelah formdata');
        //const response = yield call(services.PUT, API_BASE_URL_DEV + "/task/" + task_id + "/files", formData, HeaderAuth());
        success("New Task Added Successfully");
        yield put({
          type: SET_MODAL,
          field: "show",
          value: false
        })
        // yield* getTaskGuruList();
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
