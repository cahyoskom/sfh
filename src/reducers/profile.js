import {
  GET_USER_DATA,
  SET_PROFILE_FAILED,
  SET_PROFILE_SUCCESS,
  ON_CHANGE_STATE_PROFILE,
  REQUEST_USER_DATA
} from '../constants/ActionTypes';

const initialState = {
  data: {},
  profile: {
    isChecked: false,
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    showErrorProfile: false,
    errorMessage: '',
    success: false
  }
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        data: action.value
      };
    case SET_PROFILE_FAILED:
      return {
        ...state,
        profile: {
          ...state.profile,
          errorMessage: action.value,
          showErrorProfile: true
        }
      };
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          success: true
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
