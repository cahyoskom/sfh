import {
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAILED,
    SET_ROLES_SUCCESS,
    SET_REGISTER_SUCCESS,
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
    SET_CLOSE_ALERT
  } from "../constants/ActionTypes";
  import Config from "../constants/config";
  
  const initialState = {
    login: {
      email: "",
      password: "",
      recaptcha: ""
    },
    forgotPassword: {
      email: "",
      password: "",
      rePassword: ""
    },
    register: {
      email: "",
      fullname: "",
      noHP: "",
      alamat: "",
      password: "",
      rePassword: ""
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
    site_key: Config.CAPTCHA_KEY,
    reset_captcha: false,
    openLoginAlert: false,
    alertMsg: "",
    showSpinner: false
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case RESET_STATE_LOGIN:
        return {
          ...state,
          login: {
            email: "",
            password: ""
          },
          forgotPassword: {
            email: "",
            password: "",
            rePassword: ""
          },
          register: {
            email: "",
            fullName: "",
            noHP: "",
            alamat: "",
            password: "",
            rePassword: ""
          },
          loader: false
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
      case SET_LOADER:
        return {
          ...state,
          loader: action.value
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
        }
      case SET_CLOSE_ALERT:
        return{
          ...state,
          openLoginAlert: false
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
  