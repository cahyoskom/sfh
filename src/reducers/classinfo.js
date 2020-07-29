import {
  SET_CLASS_INFO,
  SET_CLASS_INFO_DATA,
  ON_CHANGE_STATE_CLASS_INFO,
} from "../constants/ActionTypes";
import Config from "../constants/config";
import { ErrorMessage } from "formik";

const initialState = {
  classInfo: {
    name: "",
    description: "",
    school: "",
    code: "",
    note: "",
    success: false,
    id: "",
  },
};

export default function classReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLASS_INFO_DATA:
      return {
        ...state,
        classInfo: {
          ...state.classInfo,
          name: action.value.data.name,
          school: action.value.data.school,
          description: action.value.data.description,
          code: action.value.data.code,
          note: action.value.data.note,
        },
      };
    case ON_CHANGE_STATE_CLASS_INFO:
      return {
        ...state,
        classInfo: {
          ...state.classInfo,
          [action.field]: action.value,
        },
      };
    default:
  }
  return state;
}
