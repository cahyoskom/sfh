import {
  GURU_GET_TASK_COLLECTION_LIST_SUCCESS,
  GURU_GET_UPLOADED_COLLECTION_LIST_SUCCESS,
  GET_TASK_GURU_LIST,
  GET_TASK_GURU_LIST_SUCCESS,
  GET_SUBJECT_LIST,
  GET_SUBJECT_LIST_SUCCESS,
  GET_CLASS_LIST,
  GET_CLASS_LIST_SUCCESS,
  SET_MODAL,
  SET_MODAL_FORM,
  SET_LOADER,
  SET_DATE,
  SET_TASK_LIST_FILTER,
  DELETE_TASK,
  SET_URL_PATH,
  SET_STATE_TASK_DETAIL,
  HANDLE_STATE_UPDATE_TASK,
  SET_MODAL_EDIT_FORM_GURU,
  SET_STATE_MODAL_FORM_UPLOADED_COLLECTION,
} from "../constants/ActionTypes";

const initialState = {
  data: [],
  filter: {
    class_id: [],
    // subject_id:[],
    subject_id: "",
    start_date: new Date(),
    finish_date: new Date(),
  },
  now: new Date(),
  modal: {
    show: false,
    type: "",
    title: "",
    buttonText: "",
  },
  deletedIds: null,
  taskDetail: {
    assignTo: "",
    matPel: "",
    namaTask: "",
    task: "",
    startDateTask: "",
    endDateTask: "",
    file: null,
  },
  dataSourceSubject: [],
  dataSourceClass: [],
  form: {
    task_id: "",
    assignor_id: "",
    class_id: "",
    subject_id: "",
    title: "",
    notes: "",
    weight: 0,
    start_date: new Date(),
    finish_date: new Date(),
    publish_date: new Date(),
    files: [],
    deleteFileIds: [],
  },
  formEdit: {},
  assignor_id: localStorage.getItem("user_id")
    ? JSON.parse(localStorage.getItem("user_id"))
    : undefined,
  loader: false,
  params: 0,
  // taskguru_perid
  dataCollection: [],
  dataUploadedCollection: [],
  formUploadedCollection: {
    task_collection_id: "",
    task_collection_file_id: "",
    filename: "",
    mime_type: "",
  },
};

export default function taskGuruReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASK_LIST_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.field]: action.value,
        },
      };
    case GET_TASK_GURU_LIST:
      return {
        ...state,
      };
    case GET_TASK_GURU_LIST_SUCCESS: {
      return {
        ...state,
        // data: action.value
        [action.field]: action.value,
      };
    }
    case GURU_GET_TASK_COLLECTION_LIST_SUCCESS: {
      return {
        ...state,
        // data: action.value
        [action.field]: action.value,
      };
    }
    case GURU_GET_UPLOADED_COLLECTION_LIST_SUCCESS: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case GET_SUBJECT_LIST:
      return {
        ...state,
      };
    case GET_SUBJECT_LIST_SUCCESS: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case GET_CLASS_LIST:
      return {
        ...state,
      };
    case GET_CLASS_LIST_SUCCESS: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case SET_DATE:
      return {
        ...state,
      };
    case SET_LOADER:
      return {
        ...state,
        loader: action.value,
      };
    case SET_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.field]: action.value,
        },
      };
    case DELETE_TASK:
      return {
        ...state,
        deletedIds: action.payload,
      };
    case SET_URL_PATH:
      return {
        ...state,
        params: action.payload,
      };
    case SET_MODAL_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    case SET_MODAL_EDIT_FORM_GURU: {
      return {
        ...state,
        form: action.payload,
      };
    }
    case SET_STATE_MODAL_FORM_UPLOADED_COLLECTION: {
      return {
        ...state,
        formUploadedCollection: {
          ...state.formUploadedCollection,
          [action.field]: action.value,
        },
      };
    }
    default:
  }
  return state;
}
