import {
  GET_USER_DATA,
  SET_PROFILE_FAILED,
  SET_PROFILE_SUCCESS,
  ON_CHANGE_STATE_PROFILE,
  REQUEST_USER_DATA
} from '../constants/ActionTypes';

const initialState = {
  data: {
    name: '',
    email: '',
    password: '',
    phone: ''
  },
  profile: {
    isChecked: false,
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    success: false,
    successmsg: '',
    openAlert: false,
    errormsg: '',
    editForm: false,
    confirmUpdate: false,
    updateFail: false
  }
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          name: action.value.data.name,
          email: action.value.data.email,
          password: action.value.data.password,
          phone: action.value.data.phone
        },
        profile: {
          ...state.profile,
          name: action.value.data.name,
          email: action.value.data.email,
          password: action.value.data.password,
          phone: action.value.data.phone
        }
        //data: action.value
      };
    case SET_PROFILE_FAILED:
      return {
        ...state,
        profile: {
          ...state.profile,
          updateFail: true,
          editForm: false,
          confirmUpdate: false
        }
      };
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          successmsg: action.value,
          success: true,
          editForm: false,
          confirmUpdate: false
        }
      };
    case ON_CHANGE_STATE_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.field]: action.value
        }
      };
    default:
  }
  return state;
}
