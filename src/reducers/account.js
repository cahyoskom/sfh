import {
    SET_LOGIN_SUCCESS,
    SET_REGISTER_SUCCESS,
    SET_FORGOT_SUCCESS,
    SET_LOADER,
    ON_CHANGE_STATE_LOGIN,
    ON_CHANGE_STATE_FORGOT,
    ON_CHANGE_STATE_REGISTER,
    RESET_STATE_LOGIN,
    SET_TOKEN_SUCCESS
  } from "../constants/ActionTypes";
  
  const initialState = {
    login: {
      username: "",
      password: ""
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
    token: localStorage.getItem("token"),
    profile: localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : undefined,
    loader: false
  };
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case RESET_STATE_LOGIN:
        return {
          ...state,
          login: {
            username: "",
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
  
          profile: action.value
        };
      case SET_TOKEN_SUCCESS:
        return {
          ...state,
          token: action.value
        };
      default:
    }
    return state;
  }
  