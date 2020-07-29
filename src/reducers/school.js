import {
  SET_SCHOOL_DATA,
  SET_SCHOOL_MODAL,
  ON_UPDATE_SCHOOL,
  SUCCESS_UPDATE_SCHOOL,
  FAILED_UPDATE_SCHOOL,
  REMOVE_SCHOOL_DATA,
} from "../constants/ActionTypes";
const initialState = {
  data: {},
  modal: {
    show: false,
    failed: false,
    errormsg: "",
    name: "",
    phone: "",
    address: "",
    zipcode: "",
    avatar: "",
  },
};
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCHOOL_DATA:
      return {
        ...state,
        data: action.value,
      };
    case SET_SCHOOL_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.field]: action.value,
        },
      };
    case ON_UPDATE_SCHOOL:
      return {
        ...state,
        modal: {
          ...state.modal,
          name: state.data.name,
          address: state.data.address,
          phone: state.data.phone,
          zipcode: state.data.zipcode,
          avatar: state.data.avatar,
          show: true,
        },
      };
    case SUCCESS_UPDATE_SCHOOL:
      return {
        ...state,
        data: {
          ...state.data,
          name: state.modal.name,
          address: state.modal.address,
          phone: state.modal.phone,
          zipcode: state.modal.zipcode,
          avatar: state.modal.avatar,
        },
        modal: {
          ...state.modal,
          show: false,
          name: "",
          phone: "",
          address: "",
          zipcode: "",
          avatar: "",
          failed: false,
          errormsg: "",
        },
      };
    case FAILED_UPDATE_SCHOOL:
      return {
        ...state,
        modal: {
          ...state.modal,
          failed: true,
          errormsg: action.value,
        },
      };
    case REMOVE_SCHOOL_DATA:
      return {
        ...state,
        data: {},
      };
    default:
  }
  return state;
}
