import {
    KEPSEK_GET_TASK_LIST,
    KEPSEK_GET_TASK_LIST_SUCCESS,
    KEPSEK_GET_SUBJECT_LIST,
    KEPSEK_GET_SUBJECT_LIST_SUCCESS,
    KEPSEK_GET_CLASS_LIST,
    KEPSEK_GET_CLASS_LIST_SUCCESS,
    KEPSEK_GET_TASK_COLLECTION_LIST_SUCCESS,
    SET_MODAL,
    SET_MODAL_FORM,
    SET_LOADER,
    SET_DATE,
    SET_TASK_LIST_FILTER,
    DELETE_TASK,
    SET_STATE_TASK_DETAIL,
    HANDLE_STATE_UPDATE_TASK,
    SET_URL_PATH
  } from "../constants/ActionTypes";
  
  const initialState = {
    data: [],
    filter: {
        class_id:[],
        subject_id:[],
        start_date: new Date(),
        finish_date: new Date()
    },
    now: new Date(),
    modal: {
        show: false,
        type: "",
        title: "",
        buttonText: ""
      },
    deletedIds:null,
    taskDetail: {
        assignTo: "",
        matPel: "",
        namaTask: "",
        task: "",
        startDateTask: "",
        endDateTask: "",
        file: []
    },
    // dataSourceClass : [
    //     {label: "SD 1", value: "1"},
    //     {label: "SD 2", value: "2"},
    //     {label: "SD 3", value: "3"}
    // ],
    dataSourceSubject:[],
    dataSourceClass:[],
    form: {
        assignor_id: "",
        class_id: "",
        subject_id: "",
        title: "",
        notes:"",
        weight:0,
        start_date: new Date(),
        finish_date: new Date(),
        publish_date: new Date(),
        files:[]
    },
    assignor_id: localStorage.getItem("user_id")
      ? JSON.parse(localStorage.getItem("user_id"))
      : undefined,
    loader: false,
    params:0,
    // taskkepsek_perid
    dataCollection: []
  };
  
  export default function taskKepsekReducer(state = initialState, action) {
    switch (action.type) {
        case SET_URL_PATH: 
            return {
                ...state,
                params: action.payload
            }
        case SET_TASK_LIST_FILTER:
        return {
            ...state,
            filter: {
                ...state.filter,
                [action.field]: action.value
            }
        };
        case KEPSEK_GET_TASK_LIST:
            return {
                ...state,
            };
        case KEPSEK_GET_TASK_LIST_SUCCESS: {
            return {
                ...state,
                // data: action.value
                [action.field]: action.value
            };
        }
        case KEPSEK_GET_TASK_COLLECTION_LIST_SUCCESS: {
            return {
                ...state,
                [action.field]: action.value
            };
        }
        case KEPSEK_GET_SUBJECT_LIST:
            return {
                ...state,
            };
        case KEPSEK_GET_SUBJECT_LIST_SUCCESS: {
            return {
                ...state,
                [action.field]: action.value
            };
        }
        case KEPSEK_GET_CLASS_LIST:
            return {
                ...state,
            };
        case KEPSEK_GET_CLASS_LIST_SUCCESS: {
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
        case DELETE_TASK: 
            return {
                ...state,
                deletedIds: action.payload
            }
        case SET_STATE_TASK_DETAIL:
            return {
                ...state,
                taskDetail: action.value
            };
        case HANDLE_STATE_UPDATE_TASK:
            return {
                ...state,
                taskDetail: { ...state.taskDetail, [action.field]: action.value }
            };
        case SET_MODAL_FORM:
            return {
                ...state,
                form: {
                    ...state.form,
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
  