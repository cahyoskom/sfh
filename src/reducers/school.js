import {
  SET_SCHOOL_DATA,
  SET_SCHOOL_MODAL,
  ON_UPDATE_SCHOOL,
  SUCCESS_UPDATE_SCHOOL,
  FAILED_UPDATE_SCHOOL,
  REMOVE_SCHOOL_DATA,
  SET_SCHOOL_AUTHORITY,
  DELETE_SCHOOL_FAILED,
  UPDATE_SCHOOL_SPINNER,
  DONE_UPDATE_SCHOOL,
  SET_LIST_CLASS,
  SET_CONNECT_CLASS,
  SET_MODAL_CREATE_SCHOOL_CLASS,
  SUCCESS_CONNECT_CLASS,
  FAILED_CONNECT_CLASS,
  CLOSE_MODAL_CONNECT_CLASS,
  SUCCESS_CREATE_SCHOOL_CLASS,
  FAILED_CREATE_SCHOOL_CLASS,
  CLOSE_SCHOOL_SUCCESS_MODAL,
  APPROVE_JOIN_SCHOOL,
  DECLINE_JOIN_SCHOOL,
  SET_FILTER,
  SET_FILTERED_CLASS
} from "../constants/ActionTypes";
const initialState = {
  data: {},
  listClass: [],
  userHasAuthority: true,
  modal: {
    show: false,
    failed: false,
    errormsg: "",
    name: "",
    phone: "",
    address: "",
    zipcode: "",
    avatar: "",
    showSpinner: false,
  },
  deleteSchoolFailed: false,
  deleteErrormsg: "",
  successDeleteSchool: false,
  successUpdateSchool: false,
  connectClassModal: {
    show: false,
    code: "",
    error: false,
    errormsg: "",
  },
  createClassModal: {
    show: false,
    name: "",
    description: "",
    error: false,
    errormsg: "",
  },
  successModal: {
    show: false,
    message: "",
  },
  filter: "",
  filteredClassList:[]
};
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCHOOL_DATA:
      return {
        ...state,
        data: action.value,
      };
    case SET_SCHOOL_AUTHORITY:
      return {
        ...state,
        userHasAuthority: action.value,
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
    case UPDATE_SCHOOL_SPINNER:
      return {
        ...state,
        modal: {
          ...state.modal,
          showSpinner: action.value,
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
          showSpinner: false,
        },
        successUpdateSchool: true,
      };
    case DONE_UPDATE_SCHOOL:
      return {
        ...state,
        successUpdateSchool: false,
      };
    case FAILED_UPDATE_SCHOOL:
      return {
        ...state,
        modal: {
          ...state.modal,
          failed: true,
          errormsg: action.value,
          showSpinner: false,
        },
      };
    case REMOVE_SCHOOL_DATA:
      return {
        ...state,
        data: {},
        successDeleteSchool: true,
      };
    case DELETE_SCHOOL_FAILED:
      return {
        ...state,
        deleteSchoolFailed: true,
        deleteErrormsg: action.value,
      };
    case SET_LIST_CLASS:
      return {
        ...state,
        listClass: action.value,
      };
    case SET_CONNECT_CLASS:
      return {
        ...state,
        connectClassModal: {
          ...state.connectClassModal,
          [action.field]: action.value,
        },
      };
    case SET_MODAL_CREATE_SCHOOL_CLASS:
      return {
        ...state,
        createClassModal: {
          ...state.createClassModal,
          [action.field]: action.value,
        },
      };
    case SUCCESS_CONNECT_CLASS:
      const newList = state.listClass.concat(action.value)
      return {
        ...state,
        connectClassModal: {
          ...state.connectClassModal,
          show: false,
          code: "",
          error: false,
          errormsg: "",
        },
        successModal: {
          show: false,
          message: "Kelas berhasil dihubungkan!",
        },
        listClass: newList,
        filteredClassList: newList,
        filter: '',
      };
    case FAILED_CONNECT_CLASS:
      return {
        ...state,
        connectClassModal: {
          ...state.connectClassModal,
          error: true,
          errormsg: action.value,
        },
      };
    case CLOSE_MODAL_CONNECT_CLASS:
      return {
        ...state,
        connectClassModal: {
          show: false,
          code: "",
          error: false,
          errormsg: "",
        },
      };
    case FAILED_CREATE_SCHOOL_CLASS:
      return {
        ...state,
        createClassModal: {
          ...state.createClassModal,
          error: true,
          errormsg: action.value,
        },
      };
    case SUCCESS_CREATE_SCHOOL_CLASS:
      const createdList = state.listClass.concat(action.value);
      return {
        ...state,
        createClassModal: {
          show: false,
          name: "",
          description: "",
          error: false,
          errormsg: "",
        },
        successModal: {
          show: true,
          message: "Kelas berhasil dibuat!",
        },
        listClass: createdList,
        filteredClassList: createdList,
        filter: '',
      };
    case CLOSE_SCHOOL_SUCCESS_MODAL:
      return {
        ...state,
        successModal: {
          show: false,
          message: "",
        },
      };
    case APPROVE_JOIN_SCHOOL:
      var objIndex = state.listClass.findIndex(obj => obj.id == action.field);
      var updatedObj = { ...state.listClass[objIndex], link_status: 0 };
      const updatedList = [
        ...state.listClass.slice(0, objIndex),
        updatedObj,
        ...state.listClass.slice(objIndex + 1),
      ];
      return {
        ...state,
        listClass: updatedList,
        filteredClassList: updatedList,
        successModal: {
          show: true,
          message: "Kelas berhasil dihubungkan!",
        },
      }
    case DECLINE_JOIN_SCHOOL:
      const removedList = state.listClass.filter(obj => obj.id !== action.field)
      return {
        ...state,
        listClass: removedList,
        filteredClassList: removedList,
        successModal: {
          show: true,
          message: "Kelas telah ditolak untuk disambungkan!",
        },
      }
    case SET_FILTER:
      return {
        ...state,
        filter: action.value
      }
    case SET_FILTERED_CLASS:
      return {
        ...state,
        filteredClassList: action.value,
      }
      
    default:
  }
  return state;
}
