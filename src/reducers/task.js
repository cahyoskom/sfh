import { SET_FORM_ADD_TASK, SET_LIST_TASK } from '../constants/ActionTypes';

const initialState = {
  taskList: [],
  subjectList: [],
  formAddTask: {
    show: false,
    error: false,
    errormsg: '',
    name: '',
    description: '',
    subject: '',
    startDate: '',
    EndDate: '',
    files: [],
    modalLink: false,
    link: []
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
        taskList: action.value
      };

    default:
  }
  return state;
}