import {
    GET_TASK_SISWA_LIST,
    GET_TASK_SISWA_LIST_SUCCESS,
    SET_MODAL,
    SET_LOADER,
    SET_DATE,
    SET_TASK_LIST_FILTER,
    SET_UPLOAD_TASK_SISWA,
  } from "../constants/ActionTypes";
  
  const initialState = {
    data: [],
    dataUpload: {
        task_id:0,
        task_file:[]
    },
    filter: {
        startDate: new Date(),
        endDate: new Date().setDate(new Date().getDate() + 7)
    },
    stardet: new Date(),
    modal: {
        show: false,
        type: "",
        title: "",
        buttonText: "",
        // task: {
        //     task_id:[],
        //     task_file:[]
        // }
      },
    dt: {
        filter: {
            status: "",
            taskDateFrom: "",
            taskDateTo: ""
        },
        table: {
            offset: 0,
            limit: 10,
            page: 0,
            count: 0,
            search: null,
            sortColumn: null,
            sortDirection: null
        },
        selectedRows: null,
        submitIds: null
    },
    dataSourceStatus : [
        {text: "Submited", value: "submited"},
        {text: "Belum Submit", value: "draft"},
        {text: "Semua", value: "all"}
    ],
    loader: false
  };
  
  export default function taskSiswaReducer(state = initialState, action) {
      console.log('ini reducer', action)
    switch (action.type) {
        case SET_TASK_LIST_FILTER:
        return {
            ...state,
            dt: {
                ...state.dt,
                filter: {
                    ...state.dt.filter,
                    [action.field]: action.value
                }                
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
        default:
    }
    return state;
  }
  