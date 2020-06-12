import {
    GET_TASK_SISWA_LIST,
    GET_TASK_SISWA_LIST_SUCCESS,
    STUDENT_PUT_COLLECTION_SUCCESS,
    SET_MODAL,
    SET_MODAL_FORM,
    SET_LOADER,
    SET_DATE,
    SET_TASK_LIST_FILTER,
    SET_UPLOAD_TASK_SISWA,
  } from "../constants/ActionTypes";
  
  const initialState = {
    data: [],
    dataCollection:{},
    form: {
        task_id: 0,
        task_file:[],
        task_collection_id:0,
        task_collection_ids:[],
        rows:[]
    },
    filter: {
        startDate: new Date(),
        endDate: new Date(),
        taskStatus:""
    },
    now: new Date(),
    modal: {
        show: false,
        type: "",
        title: "",
        buttonText: "",
      },
    dataSourceStatus : [
        {label: "Submited", value: "submited"},
        {label: "Belum Submit", value: "draft"},
        {label: "Semua", value: "all"}
    ],
    loader: false,
  };
  
  export default function taskSiswaReducer(state = initialState, action) {
    //   console.log('ini reducer', action)
    switch (action.type) {
        case SET_TASK_LIST_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.field]: action.value
                }
            };
        case GET_TASK_SISWA_LIST:
            return {
                ...state,
            };
        case GET_TASK_SISWA_LIST_SUCCESS: {
            return {
                ...state,
                // data: action.value
                [action.field]: action.value
            };
        }
        case STUDENT_PUT_COLLECTION_SUCCESS: {
            return {
                ...state,
                [action.field]: action.value
            };
        }
        case SET_DATE:
            return {
                ...state,
                // stardet: action.value
            };
        case SET_LOADER:
            return {
                ...state,
                loader: action.value
            };
        case SET_MODAL:
            return {
                ...state,
                modal: {
                ...state.modal,
                [action.field]: action.value
                }
            };
        case SET_MODAL_FORM:
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            };
        default:
    }
    return state;
  }
  