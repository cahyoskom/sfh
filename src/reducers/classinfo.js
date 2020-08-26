import {
  SET_CLASS_INFO,
  SET_CLASS_INFO_DATA,
  ON_CHANGE_STATE_CLASS_INFO,
  ON_CHANGE_STATE_EDIT_CLASS,
  SET_UPDATE_CLASS_SUCCESS,
  SET_UPDATE_CLASS_FAIL,
  SET_DELETE_CLASS_SUCCESS,
  SET_DELETE_CLASS_FAIL,
  SET_DUPLICATE_CLASS_SUCCESS,
  SET_DUPLICATE_CLASS_FAIL,
  SET_CLASS_MEMBERS_DATA,
  ON_CHANGE_STATE_CLASS_MEMBERS,
  ON_CHANGE_STATE_UPDATE_MEMBER,
  ON_CHANGE_STATE_ADD_MEMBER
} from '../constants/ActionTypes';
import Config from '../constants/config';
import { ErrorMessage } from 'formik';

const initialState = {
  classInfo: {
    name: '',
    description: '',
    school: '',
    code: '',
    note: '',
    success: false,
    id: '',
    hasAuthority: false,
    owner: ''
  },
  editClass: {
    id: '',
    name: '',
    description: '',
    note: '',
    schoolExist: false,
    school: '',
    schoolCode: '',
    success: false,
    successmsg: '',
    openAlert: false,
    errormsg: '',
    editForm: false,
    confirmUpdate: false,
    updateFail: false,
    confirmDelete: false,
    deleteFail: false,
    deleteSuccess: false,
    confirmDuplicate: false,
    duplicateFail: false,
    duplicateSuccess: false,
    duplicatedId: ''
  },
  members: {
    data: ''
  },
  updateMember: {
    request: '',
    userId: ''
  },
  addMember: {
    email: '',
    position: '',
    modal: false,
    error: false,
    errormsg: ''
  }
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
          id: action.value.data.id,
          hasAuthority: action.value.hasAuthority,
          owner: action.value.owner
        },
        editClass: {
          ...state.editClass,
          id: action.value.data.id,
          name: action.value.data.name,
          description: action.value.data.description,
          note: action.value.data.note,
          schoolCode: action.value.data.schoolCode
        }
      };
    case SET_CLASS_MEMBERS_DATA:
      return {
        ...state,
        members: {
          ...state.members,
          data: action.value
        },
        addMember: {
          modal: false
        }
      };
    case ON_CHANGE_STATE_CLASS_MEMBERS:
      return {
        ...state,
        members: {
          ...state.members,
          [action.field]: action.value
        }
      };
    case ON_CHANGE_STATE_CLASS_INFO:
      return {
        ...state,
        classInfo: {
          ...state.classInfo,
          [action.field]: action.value
        }
      };
    case ON_CHANGE_STATE_ADD_MEMBER:
      return {
        ...state,
        addMember: {
          ...state.addMember,
          [action.field]: action.value
        }
      };
    case ON_CHANGE_STATE_EDIT_CLASS:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          [action.field]: action.value
        }
      };
    case SET_UPDATE_CLASS_SUCCESS:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          successmsg: action.value,
          success: true,
          editForm: false,
          confirmUpdate: false
        }
      };
    case SET_UPDATE_CLASS_FAIL:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          updateFail: true,
          editForm: false,
          confirmUpdate: false
        }
      };
    case SET_DELETE_CLASS_FAIL:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          deleteFail: true,
          editForm: false,
          confirmDelete: false
        }
      };
    case SET_DUPLICATE_CLASS_FAIL:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          duplicateFail: true,
          confirmDuplicate: false
        }
      };
    case SET_DELETE_CLASS_SUCCESS:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          deleteSuccess: true,
          confirmDelete: false
        }
      };
    case SET_DUPLICATE_CLASS_SUCCESS:
      return {
        ...state,
        editClass: {
          ...state.editClass,
          duplicateSuccess: true,
          confirmDuplicate: false,
          duplicatedId: action.value
        }
      };
    case ON_CHANGE_STATE_UPDATE_MEMBER:
      return {
        ...state,
        updateMember: {
          ...state.updateMember,
          [action.field]: action.value
        }
      };
    default:
  }
  return state;
}
