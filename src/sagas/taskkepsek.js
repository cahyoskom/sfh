import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
    KEPSEK_GET_TASK_LIST,
    KEPSEK_GET_TASK_LIST_SUCCESS,
    KEPSEK_GET_SUBJECT_LIST,
    KEPSEK_GET_SUBJECT_LIST_SUCCESS,
    KEPSEK_GET_CLASS_LIST,
    KEPSEK_GET_CLASS_LIST_SUCCESS,
    KEPSEK_GET_TASK_COLLECTION_LIST,
    KEPSEK_GET_TASK_COLLECTION_LIST_SUCCESS,
    KEPSEK_GET_UPLOADED_COLLECTION_LIST,
    KEPSEK_GET_UPLOADED_COLLECTION_LIST_SUCCESS,
    KEPSEK_DOWNLOAD_COLLECTION,
    SET_LOADER,
    SET_MODAL
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { HeaderFile, HeaderAuth } from "../services/header";
import moment from 'moment'

const getKepsekState = state => state.taskKepsek;

export function* kepsekGetTaskList() {
    try {
        const taskKepsek = yield select(getKepsekState)

        yield put({
            type: SET_LOADER,
            value: true
        });

        let classes = taskKepsek.filter.class_id;
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
            class: taskKepsek.filter.class_id,
            subject: taskKepsek.filter.subject_id,
            start_date: moment(taskKepsek.filter.start_date).format("YYYY-MM-DD"),
            end_date: moment(taskKepsek.filter.end_date).format("YYYY-MM-DD"),
        };
        // console.log("param",param);
        // const response = yield call(services.GET, API_BASE_URL_DEV + "/task?class=" + param.class + "&subject=" + param.subject + optional, HeaderAuth());
        const response = yield call(services.GET, API_BASE_URL_DEV + "/task?" + paramClass + "&subject=" + param.subject, HeaderAuth());
// console.log("rzponze".response)
        if(response.status == 200){
            let datas = response.data;
            let result = [];
            for (let i=0; i < datas.data.length; i++) {
                let obj = {};
                obj.status = true;
                obj.task_id = datas.data[i].task_id;
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
                type: KEPSEK_GET_TASK_LIST_SUCCESS, 
                field: "data",
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

export function* kepsekGetTaskCollectionList() {
    try {
      const taskKepsek = yield select(getKepsekState)
  
      yield put({
          type: SET_LOADER,
          value: true
      });
  
      let task_id = taskKepsek.params;
    //   console.log('par',task_id)
      const response = yield call(services.GET, API_BASE_URL_DEV + "/task/" + task_id + "/collection", HeaderAuth());
  
      if(response.status == 200){
        let datas = response.data;
        // console.log("L", datas)
        let result = [];
        for (let i=0; i < datas.data.length; i++) {
            let obj = {};
            obj.status = datas.data[i].status;
            obj.student_name = datas.data[i].student_name;
            obj.student_no = datas.data[i].student_no;
            obj.submitted_date = datas.data[i].submitted_date;
            obj.task_collection_id = datas.data[i].task_collection_id;
            result.push(obj);
        }
        // console.log('ressss', result);
        yield put({ 
          type: KEPSEK_GET_TASK_COLLECTION_LIST_SUCCESS, 
          field: "dataCollection",
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

export function* kepsekGetSubjectList() {
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
                type: KEPSEK_GET_SUBJECT_LIST_SUCCESS, 
                field: "dataSourceSubject",
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

export function* kepsekGetClassList() {
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
                type: KEPSEK_GET_CLASS_LIST_SUCCESS, 
                field: "dataSourceClass",
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
export function* kepsekGetUploadedCollectionList() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        const taskKepsek = yield select(getKepsekState)
        let task_collection_id = taskKepsek.formUploadedCollection.task_collection_id;
    //   console.log('swsw', taskKepsek)
        const response = yield call(services.GET, API_BASE_URL_DEV + "/collection/" + task_collection_id, HeaderAuth());
        // console.log('guru', response);
        if(response.status == 200){
            let datas = response.data;
            let uploadedFiles = [];
            if(datas.data.files != null || datas.data.files != undefined){
                for(let i=0; i<datas.data.files.length; i++){
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
              task_collection_id : datas.data.task_collection_id,
              files : uploadedFiles
            };
  
            yield put({ 
                type: KEPSEK_GET_UPLOADED_COLLECTION_LIST_SUCCESS, 
                field: "dataUploadedCollection",
                value: result
            });
        }
        
        yield put({
            type: SET_LOADER,
            value: false
          });
    } 
    catch(error) {
        // console.log(error)
        fail(error);
        yield put({
            type: SET_LOADER,
            value: false
          });
    }
  }

// about collection
export function* kepsekDownloadCollection() {
    try {
        yield put({
            type: SET_LOADER,
            value: true
          });
        const taskKepsek = yield select(getKepsekState)
        let task_collection_file_id = taskKepsek.formUploadedCollection.task_collection_file_id;
        let filename = taskKepsek.formUploadedCollection.filename;
        let type = '"'+ taskKepsek.formUploadedCollection.mime_type +'"';
      
        const response = yield call(services.GETFILE, API_BASE_URL_DEV + "/collection/download/" + task_collection_file_id, HeaderFile());
        // console.log('kepsekdonlotcollection', response);
        if(response.status == 200){
            let fileDownload = response.data;
            // console.log('tipe',type)
            window.URL = window.URL || window.webkitURL;
            const blob = new Blob([fileDownload], {type: type});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        }
        else if(response.status == 404){
            fail("File /s not found");
        }
        
        yield put({
            type: SET_LOADER,
            value: false
          });
    } 
    catch(error) {
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
        takeEvery(KEPSEK_GET_TASK_LIST, kepsekGetTaskList),
        takeEvery(KEPSEK_GET_TASK_COLLECTION_LIST, kepsekGetTaskCollectionList),
        takeEvery(KEPSEK_GET_SUBJECT_LIST, kepsekGetSubjectList),
        takeEvery(KEPSEK_GET_CLASS_LIST, kepsekGetClassList),
        takeEvery(KEPSEK_GET_UPLOADED_COLLECTION_LIST, kepsekGetUploadedCollectionList),
        takeEvery(KEPSEK_DOWNLOAD_COLLECTION, kepsekDownloadCollection),
    ]);
}
