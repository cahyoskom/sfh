import * as types from '../constants/ActionTypes';
import 'react-toastify/dist/ReactToastify.min.css';

// LOGIN
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
export const setStateModalFormLogin = (field, value) => ({
  type: types.SET_MODAL_FORM_LOGIN,
  value,
  field
});

// REGISTRATION
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

// FORGOT PASSWORD
export const newPassword = () => ({
  type: types.SET_NEW_PASSWORD
});

// ADMIN ADS APROVAL
export const adminAprovalGetDataAds = () => ({
  type: types.ADMIN_APROVAL_GET_DATA_ADS
});
