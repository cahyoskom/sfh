import {
  ON_CHANGE_STATE_NEW_CLASS,
  ON_CHANGE_STATE_NEW_SCHOOL,
  ON_CHANGE_STATE_JOIN_CLASS,
  CREATE_SCHOOL_SUCCESS,
  ON_OPEN_CREATE_SCHOOL
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
    show: false,
    name: '',
    address: '',
    postalCode: '',
    phoneNumber: '',
    picture: '',
    note: '',
    success: false,
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
    case ON_CHANGE_STATE_NEW_SCHOOL:
      return {
        ...state,
        newSchool: {
          ...state.newSchool,
          [action.field]: action.value
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
    case CREATE_SCHOOL_SUCCESS:
      return {
        ...state,
        newSchool: {
          ...state.newSchool,
          success: true,
          show: false,
          name: '',
          address: '',
          postalCode: '',
          phoneNumber: '',
          picture: '',
          note: '',
          openAlert: false,
          errormsg: ''
        }
      };
    case ON_OPEN_CREATE_SCHOOL:
      return {
        ...state,
        newSchool: {
          name: '',
          address: '',
          postalCode: '',
          phoneNumber: '',
          picture: '',
          note: '',
          success: false,
          openAlert: false,
          errormsg: '',
          show: true
        }
      };
    default:
  }
  return state;
}
