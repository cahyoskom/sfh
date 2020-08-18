import {
  ON_CHANGE_STATE_NEW_CLASS,
  SET_NEW_CLASS_SUCCESS,
  ON_CHANGE_STATE_NEW_SCHOOL,
  SET_NEW_SCHOOL_SUCCESS,
  ON_CHANGE_STATE_JOIN_CLASS
} from '../constants/ActionTypes';
const initialState = {
  newClass: {
    show: '',
    name: '',
    description: '',
    school: '',
    success: false,
    successmsg: '',
    openAlert: false,
    errormsg: ''
  },
  newSchool: {
    show: '',
    name: '',
    address: '',
    postalCode: '',
    phoneNumber: '',
    picture: '',
    success: false,
    successmsg: '',
    openAlert: false,
    errormsg: ''
  },
  modaljoinClass: {
    code: '',
    show: false,
    success: false,
    successmsg: '',
    openAlert: false,
    errormsg: ''
  }
};
export default function landingReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE_STATE_NEW_CLASS:
      return {
        ...state,
        newClass: {
          ...state.newClass,
          [action.field]: action.value
        }
      };
    case SET_NEW_CLASS_SUCCESS:
      return {
        ...state,
        newClass: {
          ...state.newClass,
          success: true
        }
      };
    case ON_CHANGE_STATE_NEW_SCHOOL:
      return {
        ...state,
        newSchool: {
          ...state.newSchool,
          [action.field]: action.value
        }
      };
    case SET_NEW_SCHOOL_SUCCESS:
      return {
        ...state,
        newSchool: {
          ...state.newSchool,
          success: true
        }
      };
    case ON_CHANGE_STATE_JOIN_CLASS:
      return {
        ...state,
        modaljoinClass: {
          ...state.modaljoinClass,
          [action.field]: action.value
        }
      };
    default:
  }
  return state;
}
