import {
  GET_TASK_ORTU_LIST,
  GET_TASK_ORTU_LIST_SUCCESS,
  SET_MODAL,
  SET_LOADER,
  SET_DATE,
  ON_CHANGE_STATE_LOGIN,
  ON_CHANGE_STATE_FORGOT,
  ON_CHANGE_STATE_REGISTER,
  RESET_STATE_LOGIN,
  SET_TOKEN_SUCCESS,
} from "../constants/ActionTypes";

const initialState = {
  data: [],
  filter: {
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 7),
  },
  stardet: new Date(),
  modal: {
    show: false,
    type: "",
    title: "",
    buttonText: "",
  },
  loader: false,
};

export default function taskOrtuReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK_ORTU_LIST:
      return {
        ...state,
      };
    case GET_TASK_ORTU_LIST_SUCCESS: {
      return {
        ...state,
        // data: action.value
        [action.field]: action.value,
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
    default:
  }
  return state;
}
