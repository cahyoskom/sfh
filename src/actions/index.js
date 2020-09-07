import shop from '../api/shop';
import * as types from '../constants/ActionTypes';
import store from '../store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const optionToast = {
  autoClose: 1300
};
export const newPassword = () => ({
  type: types.SET_NEW_PASSWORD
});

//LOGIN
export const googleLogin = data => ({
  type: types.SET_GOOGLE_LOGIN,
  data
});

export const closeAlert = () => ({
  type: types.SET_CLOSE_ALERT
});

export const postLogin = () => ({
  type: types.SET_LOGIN
});

export const confirmLogin = () => ({
  type: types.SET_CONFIRM_LOGIN
});

export const updatePassword = () => ({
  type: types.SET_UPDATE_PASSWORD
});

export const setUpdatePasswordCode = value => ({
  type: types.SET_UPDATE_PASSWORD_CODE,
  value
});

export const onChangeStateLogin = (field, value) => ({
  type: types.ON_CHANGE_STATE_LOGIN,
  value,
  field
});

export const onChangeStateNewPassword = (field, value) => ({
  type: types.ON_CHANGE_STATE_NEW_PASSWORD,
  value,
  field
});

export const onChangeStateUpdatePassword = (field, value) => ({
  type: types.ON_CHANGE_STATE_UPDATE_PASSWORD,
  value,
  field
});

export const resetStateLoginMenu = () => ({
  type: types.RESET_STATE_LOGIN
});

export const postLogout = () => ({
  type: types.SET_LOGOUT
});
export const setModalActivation = (field, value) => ({
  type: types.SET_MODAL_ACTIVATION,
  value,
  field
});
export const resendEmail = () => ({
  type: types.EMAIL_ACTIVATION
});

//REGISTER
export const onChangeStateRegister = (field, value) => ({
  type: types.ON_CHANGE_STATE_REGISTER,
  value,
  field
});
export const closeRegistAlert = () => ({
  type: types.SET_CLOSE_REGIST_ALERT
});
export const saveRegister = () => ({
  type: types.SET_REGISTER
});

//admin
export const adminGetGroupList = data => ({
  type: types.ADMIN_GET_GROUP_LIST,
  payload: data
});

export const adminGetUserList = data => ({
  type: types.ADMIN_GET_USER_LIST,
  payload: data
});

export const adminGetClassList = data => ({
  type: types.ADMIN_GET_CLASS_LIST,
  payload: data
});

export const adminGetSubjectList = data => ({
  type: types.ADMIN_GET_SUBJECT_LIST,
  payload: data
});

export const adminGetStudentList = data => ({
  type: types.ADMIN_GET_STUDENT_LIST,
  payload: data
});

export const adminGetRoleList = data => ({
  type: types.ADMIN_GET_ROLE_LIST,
  payload: data
});

export const adminGetDataSourceClass = data => ({
  type: types.ADMIN_GET_DATASOURCE_CLASS,
  payload: data
});

export const adminGetDataSourceGroup = data => ({
  type: types.ADMIN_GET_DATASOURCE_GROUP,
  payload: data
});

export const adminGetDataSourceSubject = data => ({
  type: types.ADMIN_GET_DATASOURCE_SUBJECT,
  payload: data
});

export const adminGetDataSourceStudent = data => ({
  type: types.ADMIN_GET_DATASOURCE_STUDENT,
  payload: data
});

export const adminSetModalFormUser = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_USER,
  value,
  field
});

export const adminSetModalFormUserRole = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_USER_ROLE,
  value,
  field
});

export const adminSetModalFormGroup = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_GROUP,
  value,
  field
});

export const adminSetModalFormClass = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_CLASS,
  value,
  field
});

export const adminSetModalFormSubject = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_SUBJECT,
  value,
  field
});

export const adminSetModalFormStudent = (field, value) => ({
  type: types.ADMIN_SET_MODAL_FORM_STUDENT,
  value,
  field
});

export const adminCreateUser = () => ({
  type: types.ADMIN_CREATE_USER
});

export const adminCreateClass = () => ({
  type: types.ADMIN_CREATE_CLASS
});

export const adminCreateSubject = () => ({
  type: types.ADMIN_CREATE_SUBJECT
});

export const adminCreateStudent = () => ({
  type: types.ADMIN_CREATE_STUDENT
});

export const adminSignUserRole = () => ({
  type: types.ADMIN_SIGN_USER_ROLE
});

export const setStateModalFormLogin = (field, value) => ({
  type: types.SET_MODAL_FORM_LOGIN,
  value,
  field
});

export const adminGetUserById = data => ({
  type: types.ADMIN_GET_USER_BY_ID,
  payload: data
});

export const adminGetRoleByUserId = data => ({
  type: types.ADMIN_GET_ROLE_BY_USER_ID,
  payload: data
});
