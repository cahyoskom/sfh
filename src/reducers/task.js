import {
  SET_FORM_ADD_TASK,
  SET_LIST_TASK,
  DELETE_ADD_TASK_FILE,
  ADD_TASK_LINK,
  DELETE_TASK_LINK,
  GET_SUBJECT_LIST_SUCCESS,
  SUCCESS_ADD_TASK,
  ERROR_TASK,
  CLOSE_ERROR_TASK_MODAL,
  SUCCESS_DELETE_TASK,
  ON_CHANGE_TASK_FILTER,
  ADD_NEW_TASK_FILE
} from '../constants/ActionTypes';
import * as moment from 'moment';

const initialState = {
  taskList: [],
  totalStudents: -1,
  isStudent: false,
  subjectList: [],
  filter: {
    startDate: moment().format('YYYY-MM-DD'),
    endDate: '',
    status: '',
    search: ''
  },
  formAddTask: {
    show: false,
    error: false,
    errormsg: '',
    name: '',
    description: '',
    subject: '',
    startDate: '',
    endDate: '',
    files: [],
    modalLink: false,
    linkState: '',
    link: []
  },
  errorModal: {
    show: false,
    message: ''
  }
};
export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FORM_ADD_TASK:
      return {
        ...state,
        formAddTask: {
          ...state.formAddTask,
          [action.field]: action.value
        }
      };
    case SET_LIST_TASK:
      return {
        ...state,
        taskList: action.value.data,
        totalStudents: action.value.totalStudents,
        isStudent: action.value.isStudent
      };
    case GET_SUBJECT_LIST_SUCCESS:
      return {
        ...state,
        subjectList: action.value
      };
    case DELETE_ADD_TASK_FILE:
      return {
        ...state,
        formAddTask: {
          ...state.formAddTask,
          files: state.formAddTask.files.filter(file => file.name !== action.value)
        }
      };
    case ADD_NEW_TASK_FILE:
      return {
        ...state,
        formAddTask: {
          ...state.formAddTask,
          files: state.formAddTask.files.concat(action.value)
        }
      };
    case ADD_TASK_LINK:
      return {
        ...state,
        formAddTask: {
          ...state.formAddTask,
          link: state.formAddTask.link.concat(state.formAddTask.linkState),
          linkState: '',
          modalLink: false
        }
      };
    case DELETE_TASK_LINK:
      return {
        ...state,
        formAddTask: {
          ...state.formAddTask,
          link: state.formAddTask.link.filter((obj, index) => index !== action.value)
        }
      };
    case SUCCESS_ADD_TASK:
      return {
        ...state,
        // taskList: state.taskList.concat(action.value),
        formAddTask: {
          show: false,
          error: false,
          errormsg: '',
          name: '',
          description: '',
          subject: '',
          startDate: '',
          endDate: '',
          files: [],
          modalLink: false,
          linkState: '',
          link: []
        }
      };
    // case SUCCESS_DELETE_TASK:
    //   return {
    //     ...state,
    //     taskList: state.taskList.filter(task => task.id !== action.value)
    //   };
    case ERROR_TASK:
      return {
        ...state,
        formAddTask: {
          show: false,
          error: false,
          errormsg: '',
          name: '',
          description: '',
          subject: '',
          startDate: '',
          endDate: '',
          files: [],
          modalLink: false,
          linkState: '',
          link: []
        },
        errorModal: {
          show: true,
          message: action.value
        }
      };
    case CLOSE_ERROR_TASK_MODAL:
      return {
        ...state,
        errorModal: {
          show: false,
          message: ''
        }
      };
    case ON_CHANGE_TASK_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.field]: action.value
        }
      };

    default:
  }
  return state;
}
