import { all, takeEvery, put, fork, select, call } from 'redux-saga/effects';
import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAILED,
  SET_CONFIRM_LOGIN,
  // SET_CONFIRM_LOGIN_SUCCESS,
  // SET_ROLES_SUCCESS,
  SET_TOKEN_SUCCESS,
  SET_LOGOUT,
  SET_LOADER,
  SET_SPINNER,
  // SET_MODAL,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  SET_UPDATE_PASSWORD,
  SET_GOOGLE_LOGIN,
  RESET_STATE_LOGIN,
  SET_REGISTER,
  SET_REGISTER_FAILED,
  SET_REGISTER_SUCCESS,
  SET_RESEND_ACTIVATION,
  EMAIL_ACTIVATION,
  EMAIL_ACTIVATION_SUCCESS,
  SET_MODAL_ACTIVATION,
  SET_RESEND_ACTIVATION_REGIST,
  ON_CHANGE_STATE_NEW_PASSWORD
} from '../constants/ActionTypes';
import { fail, success } from '../components/common/toast-message';
import * as services from '../services';
import { API_BASE_URL_DEV, API_PATH } from '../constants/api';
import { Header, HeaderAuth } from '../services/header';
import group from '../components/usermanagement/group';
//import updatePassword from "../components/pages/update-password";

const getAccountState = (state) => state.account;
export function* googleLogin(action) {
  if (action.data.tokenId) {
    let param = {
      tokenId: action.data.tokenId
    };
    const _response = yield call(
      services.POST,
      API_BASE_URL_DEV + API_PATH.oauth,
      param,
      Header()
    );
    if (_response.status === 200) {
      let data = _response.data;
      let profile = {
        user_id: data.user.user_id || '',
        name: data.user.name || '',
        email: data.user.email || ''
      };
      if (data.token && data.token != '') {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('token', data.token || null);
        localStorage.setItem('name', JSON.stringify(data.user.name));
        localStorage.setItem('user_id', JSON.stringify(data.user.user_id));
        yield put({
          type: SET_LOGIN_SUCCESS,
          value: profile
        });

        yield put({
          type: SET_TOKEN_SUCCESS,
          value: data.token
        });
        window.location.href = process.env.PUBLIC_URL + '/';
      }
    } else {
      yield put({
        type: SET_LOGIN_FAILED,
        value: _response.data.message
      });
    }
  } else {
    yield put({
      type: SET_LOGIN_FAILED,
      value: action.data.error
    });
    yield put({
      type: RESET_STATE_LOGIN
    });
  }
}

export function* login() {
  try {
    const accountState = yield select(getAccountState);
    const loginState = accountState.login;
    yield put({
      type: SET_SPINNER,
      value: true
    });
    let param = {
      email: loginState.email,
      password: loginState.password
    };
    console.log(param);
    const _response = yield call(
      services.POST,
      API_BASE_URL_DEV + API_PATH.login,
      param,
      Header()
    );
    if (_response.status === 200) {
      let data = _response.data;
      let profile = {
        user_id: data.user.user_id || '',
        username: data.user.name || '',
        email: data.user.email || ''
      };
      if (data.token && data.token != '') {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('token', data.token || null);
        localStorage.setItem('name', JSON.stringify(data.user.name));
        localStorage.setItem('user_id', JSON.stringify(data.user.user_id));
        if (loginState.isChecked) {
          localStorage.setItem('isChecked', true);
          localStorage.setItem('email', loginState.email);
          localStorage.setItem('password', loginState.password);
        }
        yield put({
          type: SET_LOGIN_SUCCESS,
          value: profile
        });
        yield put({
          type: RESET_STATE_LOGIN
        });
        yield put({
          type: SET_TOKEN_SUCCESS,
          value: data.token
        });
      }
      window.location.href = process.env.PUBLIC_URL + '/';
    } else if (_response.data.resendActivation) {
      yield put({
        type: SET_LOGIN_FAILED,
        value: _response.data.message
      });
      yield put({
        type: SET_RESEND_ACTIVATION,
        value: _response.data.resendActivation
      });
    } else {
      console.log(_response.data.message);
      yield put({
        type: SET_LOGIN_FAILED,
        value: _response.data.message
      });
    }
    yield put({
      type: SET_SPINNER,
      value: false
    });
  } catch (error) {
    // yield put({
    //   type: SET_LOADER,
    //   value: false
    // });
    yield put({
      type: SET_LOGIN_FAILED,
      value: error
    });
    yield put({
      type: SET_SPINNER,
      value: false
    });
    // fail(error);
  }
}

export function* newPassword() {
  console.log('new Password clicked');
  try {
    const accountState = yield select(getAccountState);
    const newPasswordState = accountState.newPassword;

    let param = {
      email: newPasswordState.email
    };

    const _response = yield call(
      services.POST,
      API_BASE_URL_DEV + API_PATH.newPassword,
      param,
      Header()
    );

    if (_response.status == 200) {
      let data = _response.data;
      console.log(_response);
      let message = data.message;

      yield put({
        type: ON_CHANGE_STATE_NEW_PASSWORD,
        value: message,
        field: 'successmsg'
      });
      yield put({
        type: ON_CHANGE_STATE_NEW_PASSWORD,
        value: true,
        field: 'success'
      });
      success(message);
    } else {
      yield put({
        type: ON_CHANGE_STATE_NEW_PASSWORD,
        value: true,
        field: 'openAlert'
      });
      yield put({
        type: ON_CHANGE_STATE_NEW_PASSWORD,
        value: _response.data.message,
        field: 'errormsg'
      });
    }
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });

    yield put({
      type: ON_CHANGE_STATE_NEW_PASSWORD,
      value: true,
      field: 'openAlert'
    });
    yield put({
      type: ON_CHANGE_STATE_NEW_PASSWORD,
      value: error,
      field: 'errormsg'
    });

    fail(error);
  }
}

export function* updatePassword() {
  console.log('update Password');
  try {
    const accountState = yield select(getAccountState);
    const updatePasswordState = accountState.updatePassword;

    if (updatePasswordState.recaptcha == '') {
      fail('lakukan captcha');
      return;
    }
    if (updatePasswordState.password != updatePasswordState.repeatPassword) {
      console.log('password tidak sama');
      fail('password tidak sama');
      return;
    }

    let param = {
      email: updatePasswordState.email,
      password: updatePasswordState.password
    };

    const _response = yield call(
      services.POST,
      API_BASE_URL_DEV + API_PATH.updatePassword + updatePasswordState.code,
      param,
      Header()
    );

    if (_response.status == 200) {
      let data = _response.data;
      console.log(_response);
      let message = data.message;

      // yield put({
      //   type: SET_NEW_PASSWORD_SUCCESS
      // });

      success(message);
    }
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function* confirmLogin() {
  try {
    const accountState = yield select(getAccountState);
    yield put({
      type: SET_LOADER,
      value: true
    });

    // let roles = accountState.roles[0];
    let roles = JSON.parse(localStorage.getItem('roles'));
    let group_id = accountState.role.group_id;
    let result = [];
    // console.log('cap', accountState.login)
    // console.log('ampun2', group_id)
    for (var i = 0; i < roles.length; i++) {
      if (roles[i].group_id == group_id) {
        let role = {};
        role.group_id = roles[i].group_id;
        role.group_name = roles[i].group_name;
        role.class_id = roles[i].class_id;
        role.class_name = roles[i].class_name;
        role.subject_id = roles[i].subject_id;
        role.subject_name = roles[i].subject_name;
        role.student_id = roles[i].student_id;
        role.student_no = roles[i].student_no;
        role.student_name = roles[i].student_name;
        role.student_class_id = roles[i].student_class_id;
        role.sex = roles[i].sex;
        result.push(role);
        localStorage.setItem('role', JSON.stringify(result));
      } else {
        // roles.splice(i, 1);
        continue;
      }
    }

    let selectedRole = JSON.parse(localStorage.getItem('role'));
    // console.log('sltd',selectedRole)
    if (selectedRole[0].group_id == 1) {
      window.location.href = process.env.PUBLIC_URL + '/usermanagement';
    }

    if (selectedRole[0].group_id == 2) {
      window.location.href = process.env.PUBLIC_URL + '/taskkepsek';
    }

    if (selectedRole[0].group_id == 3) {
      window.location.href = process.env.PUBLIC_URL + '/taskortu';
    }

    if (selectedRole[0].group_id == 4) {
      window.location.href = process.env.PUBLIC_URL + '/taskguru';
    }

    if (selectedRole[0].group_id == 5) {
      window.location.href = process.env.PUBLIC_URL + '/taskguardian';
    }

    if (selectedRole[0].group_id == 6) {
      window.location.href = process.env.PUBLIC_URL + '/tasksiswa';
    }

    yield put({
      type: SET_LOADER,
      value: false
    });
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export function logout() {
  try {
    // yield put({
    //   type: SET_LOADER,
    //   value: true,
    // });
    // const _response = yield call(
    //   services.GET,
    //   API_BASE_URL_DEV + API_PATH.logout,
    //   HeaderAuth()
    // );
    // yield put({
    //   type: SET_LOADER,
    //   value: false,
    // });
    localStorage.clear();
    window.location.href = process.env.PUBLIC_URL + '/login';
  } catch (error) {
    // yield put({
    //   type: SET_LOADER,
    //   value: false
    // });
    fail(error);
  }
}

export function* registration() {
  try {
    const accountState = yield select(getAccountState);
    const registState = accountState.register;
    let param = {
      email: registState.email,
      password: registState.password,
      phone: registState.noHP,
      name: registState.fullname
    };
    const _response = yield call(
      services.PUT,
      API_BASE_URL_DEV + API_PATH.register,
      param,
      Header()
    );
    if (_response.status === 200) {
      yield put({
        type: RESET_STATE_LOGIN
      });
      yield put({
        type: SET_REGISTER_SUCCESS
      });
    } else if (_response.data.error === 401001) {
      yield put({
        type: SET_REGISTER_FAILED,
        value: _response.data.message
      });
      yield put({
        type: SET_RESEND_ACTIVATION_REGIST,
        value: true
      });
    } else {
      yield put({
        type: SET_REGISTER_FAILED,
        value: _response.data.message
      });
    }
  } catch (error) {
    yield put({
      type: SET_REGISTER_FAILED,
      value: error
    });
  }
}
export function* sendEmail() {
  try {
    const accountState = yield select(getAccountState);
    let param = {
      email: accountState.modalActivation.email
    };
    const _response = yield call(
      services.POST,
      API_BASE_URL_DEV + API_PATH.requestActivation,
      param,
      Header()
    );
    if (_response.status === 200) {
      yield put({
        type: EMAIL_ACTIVATION_SUCCESS,
        value: _response.data.message
      });
    } else {
      yield put({
        type: SET_MODAL_ACTIVATION,
        value: _response.data.message,
        field: 'errormsg'
      });
      yield put({
        type: SET_MODAL_ACTIVATION,
        value: true,
        field: 'openAlert'
      });
    }
  } catch (error) {
    yield put({
      type: SET_MODAL_ACTIVATION,
      value: error,
      field: 'errormsg'
    });
    yield put({
      type: SET_MODAL_ACTIVATION,
      value: true,
      field: 'openAlert'
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SET_LOGIN, login),
    takeEvery(SET_NEW_PASSWORD, newPassword),
    takeEvery(SET_GOOGLE_LOGIN, googleLogin),
    takeEvery(SET_CONFIRM_LOGIN, confirmLogin),
    takeEvery(SET_LOGOUT, logout),
    takeEvery(SET_UPDATE_PASSWORD, updatePassword),
    takeEvery(SET_REGISTER, registration),
    takeEvery(EMAIL_ACTIVATION, sendEmail)
  ]);
}
