import {
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAILED,
    SET_RESEND_ACTIVATION,
    SET_ROLES_SUCCESS,
    SET_REGISTER_SUCCESS,
    SET_REGISTER_FAILED,
    SET_CLOSE_REGIST_ALERT,
    SET_FORGOT_SUCCESS,
    SET_CONFIRM_LOGIN_SUCCESS,
    SET_LOADER,
    ON_CHANGE_STATE_LOGIN,
    ON_CHANGE_STATE_FORGOT,
    ON_CHANGE_STATE_REGISTER,
    RESET_STATE_LOGIN,
    SET_TOKEN_SUCCESS,
    SET_MODAL,
    SET_MODAL_FORM_LOGIN,
    SET_CLOSE_ALERT,
    SET_SPINNER,
    SET_MODAL_ACTIVATION,
    EMAIL_ACTIVATION_SUCCESS,
    SET_RESEND_ACTIVATION_REGIST,
  } from "../constants/ActionTypes";
  import Config from "../constants/config";
import { ErrorMessage } from "formik";
  
  const initialState = {
    login: {
      isChecked: false,
      email: "",
      password: "",
      // recaptcha: ""
    },
    forgotPassword: {
      email: "",
      password: "",
      rePassword: ""
    },
    register: {
      isChecked: false,
      email: "",
      fullname: "",
      noHP: "",
      password: "",
      rePassword: "",
      showErrorRegister: false,
      errorMessage: "",
      success: false
    },
    // roles:[],
    // roles: localStorage.getItem("roles")
    //   ? JSON.parse(localStorage.getItem("roles"))
    //   : undefined,
    // dataSourceRoleAccount:[
    //   // {label:"A",value:"A"},
    //   // {label:"B",value:"B"}
    // ],
    // selectedRole: localStorage.getItem("role")
    //   ? JSON.parse(localStorage.getItem("role"))
    //   : undefined,
    // role:{
    //   group_id: "",
    //   group_name: "",
    //   class_id: 0,
    //   class_name: "",
    //   subject_id: 0,
    //   subject_name: "",
    //   student_id: 0,
    //   student_no: "",
    //   student_name: "",
    //   student_class_id: 0,
    //   sex: ""
    // },
    token: localStorage.getItem("token"),
    profile: localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : undefined,
    loader: false,
    modal: {
      show: false,
      type: "switch",
      title: "Select Group",
      buttonText: "OK",
    },
    openLoginAlert: false,
    alertMsg: "",
    showSpinner: false,
    resendActivation: false,
    resendActivationRegist : false,
    modalActivation:{
      show: false,
      errormsg: "",
      openAlert: false,
      email:"",
      success: false,
      successmsg: ""
    }
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case RESET_STATE_LOGIN:
        return {
          ...state,
          login: {
            isChecked: false,
            email: "",
            password: ""
          },
          forgotPassword: {
            email: "",
            password: "",
            rePassword: ""
          },
          register: {
            isChecked: false,
            email: "",
            fullname: "",
            noHP: "",
            password: "",
            rePassword: "",
            showErrorRegister: false,
            errorMessage: "",
            success: false
          },
          loader: false,
          openLoginAlert: false,
          alertMsg: "",
          showSpinner: false,
          resendActivation: false,
          resendActivationRegist : false,
          modalActivation: {
            show: false,
            errormsg: "",
            openAlert: false,
            email:"",
            success: false,
            successmsg: ""
          }
        };
      case ON_CHANGE_STATE_LOGIN:
        return {
          ...state,
          login: {
            ...state.login,
            [action.field]: action.value
          }
        };
      case ON_CHANGE_STATE_REGISTER:
        return {
          ...state,
          register: {
            ...state.register,
            [action.field]: action.value
          }
        };
      case ON_CHANGE_STATE_FORGOT:
        return {
          ...state,
          forgotPassword: {
            ...state.forgotPassword,
            [action.field]: action.value
          }
        };
      case SET_MODAL_ACTIVATION:
        return {
          ...state,
          modalActivation:{
            ...state.modalActivation,
            [action.field]: action.value
          }
      };
      case EMAIL_ACTIVATION_SUCCESS:
        return {
          ...state,
          login: {
            isChecked: false,
            email: "",
            password: ""
          },
          forgotPassword: {
            email: "",
            password: "",
            rePassword: ""
          },
          register: {
            isChecked: false,
            email: "",
            fullname: "",
            noHP: "",
            password: "",
            rePassword: "",
            showErrorRegister: false,
            errorMessage: "",
            success: false
          },
          loader: false,
          openLoginAlert: false,
          alertMsg: "",
          showSpinner: false,
          resendActivation: false,
          resendActivationRegist : false,
          modalActivation: {
            show: true,
            errormsg: "",
            openAlert: false,
            email:"",
            success: true,
            successmsg: action.value
          }
      };
      case SET_LOADER:
        return {
          ...state,
          loader: action.value
      };
      case SET_SPINNER:
        return {
          ...state,
          showSpinner: action.value
      };
      case SET_LOGIN_SUCCESS:
        return {
          ...state,
  
          profile: action.value,
          showSpinner: false
      };
      case SET_LOGIN_FAILED:
        return {
          ...state,
          alertMsg: action.value,
          openLoginAlert: true,
          showSpinner: false
      };
      case SET_RESEND_ACTIVATION:
        return {
          ...state,
          resendActivation: action.value
      };
      case SET_RESEND_ACTIVATION_REGIST:
        return {
          ...state,
          resendActivationRegist: action.value
      };
      case SET_CLOSE_ALERT:
        return{
          ...state,
          openLoginAlert: false
        }
      case SET_CLOSE_REGIST_ALERT:
        return{
          ...state,
          register:{
            ...state.register,
            showErrorRegister: false,
            errorMessage: ""
          }
      };
      case SET_REGISTER_FAILED:
        return{
          ...state,
          register:{
            ...state.register,
            errorMessage: action.value,
            showErrorRegister: true
          }
      };
      case SET_REGISTER_SUCCESS:
        return{
          ...state,
          register:{
            ...state.register,
            success: true
          }
        }
      case SET_TOKEN_SUCCESS:
        return {
          ...state,
          token: action.value
        };
      case SET_ROLES_SUCCESS:
        return {
          ...state,
          roles: action.value
        };
      case SET_MODAL:
        return {
            ...state,
            modal: {
            ...state.modal,
            [action.field]: action.value
            }
        };
      case SET_CONFIRM_LOGIN_SUCCESS:
        return {
          ...state,
          [action.field]: action.value
        };
      case SET_MODAL_FORM_LOGIN:
        return {
            ...state,
            role: {
                ...state.role,
                [action.field]: action.value
            }
        };
      default:
    }
    return state;
  }
  