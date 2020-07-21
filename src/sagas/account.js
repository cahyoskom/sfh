import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import {
  SET_LOGIN,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_FAILED,
  SET_CONFIRM_LOGIN,
  SET_CONFIRM_LOGIN_SUCCESS,
  SET_ROLES_SUCCESS,
  SET_TOKEN_SUCCESS,
  SET_LOGOUT,
  SET_LOADER,
  SET_MODAL,
  SET_GOOGLE_LOGIN,
  RESET_STATE_LOGIN
} from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";
import group from "../components/usermanagement/group";

const getAccountState = state => state.account;
export function* googleLogin(action){
  if (action.data.tokenId){
    let param = {
      tokenId : action.data.tokenId
    }
    const _response = yield call(services.POST, API_BASE_URL_DEV + API_PATH.oauth, param, Header());
    if (_response.status === 200){
      let data = _response.data
        let profile = {
          user_id: data.user.user_id || "",
          name: data.user.name || "",
          email: data.user.email || "",
        }
        if (data.token && data.token != "") {
          localStorage.setItem("profile", JSON.stringify(profile));
          localStorage.setItem("token", data.token || null);
          localStorage.setItem("name", JSON.stringify(data.user.name));
          localStorage.setItem("user_id", JSON.stringify(data.user.user_id));
          yield put({
            type: SET_LOGIN_SUCCESS,
            value: profile
          });
          
          yield put({
            type: SET_TOKEN_SUCCESS,
            value: data.token
          });
          window.location.href = process.env.PUBLIC_URL + "/"
        }
    } else {
      yield put({
        type: SET_LOGIN_FAILED,
        value: _response.data.message
      })
    }
  } else {
      yield put({
        type: SET_LOGIN_FAILED,
        value: action.data.error
      })
      yield put({
        type: RESET_STATE_LOGIN
      })
  }
  
}

export function* login() {
  try {
    const accountState = yield select(getAccountState);
    const loginState = accountState.login;
    // yield put({
    //   type: SET_LOADER,
    //   value: true
    // });
    let param = {
      email: loginState.email,
      password: loginState.password
    };
    const _response = yield call(services.POST, API_BASE_URL_DEV + API_PATH.login, param, Header());
    if (_response.status === 200) {

      let data = _response.data
      let profile = {
        user_id: data.user.user_id || "",
        username: data.user.name || "",
        email: data.user.email || "",
      }
      if (data.token && data.token != "") {
        localStorage.setItem("profile", JSON.stringify(profile));
        localStorage.setItem("token", data.token || null);
        localStorage.setItem("name", JSON.stringify(data.user.name));
        localStorage.setItem("user_id", JSON.stringify(data.user.user_id));
        if(loginState.isChecked) {
          localStorage.setItem("isChecked", true);
          localStorage.setItem("email", loginState.email);
          localStorage.setItem("password", loginState.password)
        }
        yield put({
          type: SET_LOGIN_SUCCESS,
          value: profile
        });
        
        yield put({
          type: SET_TOKEN_SUCCESS,
          value: data.token
        });
        
//         let roles = data.roles;
//         var size = Object.keys(roles).length;
// // Object.keys(roles).forEach(obj=>{
//   console.log("Key-> ",obj, " value-> ", roles[obj]);
// });
// console.log('ini d0i', roles)     
// console.log('ini size', size)        
        // if(size == 1){
        //   if(!! roles[1]){
        //     let result = [];
        //     for(var i = 0; i < roles[1].length; i++){
        //       let role = {};
        //       role.group_id = roles[1][i].group_id;
        //       role.group_name = roles[1][i].group_name;
        //       role.class_id = roles[1][i].class_id;
        //       role.class_name = roles[1][i].class_name;
        //       role.subject_id = roles[1][i].subject_id;
        //       role.subject_name = roles[1][i].subject_name;
        //       role.student_id = roles[1][i].student_id;
        //       role.student_no = roles[1][i].student_no;
        //       role.student_name = roles[1][i].student_name;
        //       role.student_class_id = roles[1][i].student_class_id;
        //       role.sex = roles[1][i].sex;
        //       result.push(role);
        //     }
        //     localStorage.setItem("roles", JSON.stringify(result));
        //     localStorage.setItem("role", JSON.stringify(result));
        //     window.location.href = process.env.PUBLIC_URL + "/usermanagement";
        //   }

        //   if(!! roles[2]){
        //     let result = [];
        //     for(var i = 0; i < roles[2].length; i++){
        //       let role = {};
        //       role.group_id = roles[2][i].group_id;
        //       role.group_name = roles[2][i].group_name;
        //       role.class_id = roles[2][i].class_id;
        //       role.class_name = roles[2][i].class_name;
        //       role.subject_id = roles[2][i].subject_id;
        //       role.subject_name = roles[2][i].subject_name;
        //       role.student_id = roles[2][i].student_id;
        //       role.student_no = roles[2][i].student_no;
        //       role.student_name = roles[2][i].student_name;
        //       role.student_class_id = roles[2][i].student_class_id;
        //       role.sex = roles[2][i].sex;
        //       result.push(role);
        //     }
        //     localStorage.setItem("roles", JSON.stringify(result));
        //     localStorage.setItem("role", JSON.stringify(result));
        //     window.location.href = process.env.PUBLIC_URL + "/taskkepsek";
        //   }

        //   if(!! roles[3]){
        //     let result = [];
        //     for(var i = 0; i < roles[3].length; i++){
        //         let role = {};
        //         role.group_id = roles[3][i].group_id;
        //         role.group_name = roles[3][i].group_name;
        //         role.class_id = roles[3][i].class_id;
        //         role.class_name = roles[3][i].class_name;
        //         role.subject_id = roles[3][i].subject_id;
        //         role.subject_name = roles[3][i].subject_name;
        //         role.student_id = roles[3][i].student_id;
        //         role.student_no = roles[3][i].student_no;
        //         role.student_name = roles[3][i].student_name;
        //         role.student_class_id = roles[3][i].student_class_id;
        //         role.sex = roles[3][i].sex;
        //         result.push(role);
        //     }
        //     localStorage.setItem("roles", JSON.stringify(result));
        //     localStorage.setItem("role", JSON.stringify(result));
        //     window.location.href = process.env.PUBLIC_URL + "/taskortu";
        //   }

        //   if(!! roles[4]){
        //     let result = [];
        //     for(var i = 0; i < roles[4].length; i++){
        //       let role = {};
        //       role.group_id = roles[4][i].group_id;
        //       role.group_name = roles[4][i].group_name;
        //       role.class_id = roles[4][i].class_id;
        //       role.class_name = roles[4][i].class_name;
        //       role.subject_id = roles[4][i].subject_id;
        //       role.subject_name = roles[4][i].subject_name;
        //       role.student_id = roles[4][i].student_id;
        //       role.student_no = roles[4][i].student_no;
        //       role.student_name = roles[4][i].student_name;
        //       role.student_class_id = roles[4][i].student_class_id;
        //       role.sex = roles[4][i].sex;
        //       result.push(role);
        //     }
        //     localStorage.setItem("roles", JSON.stringify(result));
        //     localStorage.setItem("role", JSON.stringify(result));
        //     window.location.href = process.env.PUBLIC_URL + "/taskguru";
        //   }

        //   if(!! roles[5]){
        //     let result = [];
        //     for(var i = 0; i < roles[5].length; i++){
        //       let role = {};
        //       role.group_id = roles[5][i].group_id;
        //       role.group_name = roles[5][i].group_name;
        //       role.class_id = roles[5][i].class_id;
        //       role.class_name = roles[5][i].class_name;
        //       role.subject_id = roles[5][i].subject_id;
        //       role.subject_name = roles[5][i].subject_name;
        //       role.student_id = roles[5][i].student_id;
        //       role.student_no = roles[5][i].student_no;
        //       role.student_name = roles[5][i].student_name;
        //       role.student_class_id = roles[5][i].student_class_id;
        //       role.sex = roles[5][i].sex;
        //       result.push(role);
        //     }
        //     localStorage.setItem("roles", JSON.stringify(result));
        //     localStorage.setItem("role", JSON.stringify(result));
        //     window.location.href = process.env.PUBLIC_URL + "/taskguardian";
        //   }

        //   if(!! roles[6]){ 
        //     let result = [];
        //     for(var i = 0; i < roles[6].length; i++){
        //       let role = {};
        //       role.group_id = roles[6][i].group_id;
        //       role.group_name = roles[6][i].group_name;
        //       role.class_id = roles[6][i].class_id;
        //       role.class_name = roles[6][i].class_name;
        //       role.subject_id = roles[6][i].subject_id;
        //       role.subject_name = roles[6][i].subject_name;
        //       role.student_id = roles[6][i].student_id;
        //       role.student_no = roles[6][i].student_no;
        //       role.student_name = roles[6][i].student_name;
        //       role.student_class_id = roles[6][i].student_class_id;
        //       role.sex = roles[6][i].sex;
        //       result.push(role);
        //     }
        //     localStorage.setItem("roles", JSON.stringify(result));
        //     localStorage.setItem("role", JSON.stringify(result));
        //     window.location.href = process.env.PUBLIC_URL + "/tasksiswa";
        //   }
        // }
        // else{
        //   // console.log("msk situ 1",roles[2])
        //   // console.log("msk situ 2",roles[4])
        //   let result = [];
        //   let res = [];
        //   Object.keys(roles).forEach(obj=>{
        //     // console.log("Key-> ",obj, " value-> ", roles[obj][0].group_name, roles[obj][0].group_id);
        //     let ob = {};
        //     ob.label = roles[obj][0].group_name;
        //     ob.value = roles[obj][0].group_id;
        //     result.push(ob);

        //     let role = {};
        //     role.group_id = roles[obj][0].group_id;
        //     role.group_name = roles[obj][0].group_name;
        //     role.class_id = roles[obj][0].class_id;
        //     role.class_name = roles[obj][0].class_name;
        //     role.subject_id = roles[obj][0].subject_id;
        //     role.subject_name = roles[obj][0].subject_name;
        //     role.student_id = roles[obj][0].student_id;
        //     role.student_no = roles[obj][0].student_no;
        //     role.student_name = roles[obj][0].student_name;
        //     role.student_class_id = roles[obj][0].student_class_id;
        //     role.sex = roles[obj][0].sex;
        //     res.push(role);
        //   });
        //   localStorage.setItem("roles", JSON.stringify(res));
        //   localStorage.setItem("role", JSON.stringify(res));

        //   console.log("ser", result, res)
        //   console.log('cap', accountState.login)
        //   yield put({ 
        //     type: SET_CONFIRM_LOGIN_SUCCESS, 
        //     field: "dataSourceRoleAccount",
        //     value: result
        //   });
        //   yield put({
        //     type: SET_MODAL,
        //     field: "show",
        //     value: true
        //   })
        // }
        // console.log('ini dia', roles[4][0].group_name)
      }
      window.location.href = process.env.PUBLIC_URL +"/";
    } else {
      yield put({
        type: SET_LOGIN_FAILED,
        value: _response.data.message
      })
    }
    // yield put({
    //   type: SET_LOADER,
    //   value: false
    // });
  } catch (error) {
    // yield put({
    //   type: SET_LOADER,
    //   value: false
    // });
    yield put({
      type: SET_LOGIN_FAILED,
      value: error
    })
    // fail(error);
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
    let roles = JSON.parse(localStorage.getItem("roles"));
    let group_id = accountState.role.group_id;
    let result = [];
    // console.log('cap', accountState.login)
    // console.log('ampun2', group_id)
    for(var i = 0; i < roles.length; i++) {
      if(roles[i].group_id == group_id) {
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
        localStorage.setItem("role", JSON.stringify(result));
      }
      else{
        // roles.splice(i, 1);
        continue;
      }
    }

    let selectedRole = JSON.parse(localStorage.getItem("role"));
    // console.log('sltd',selectedRole)
    if(selectedRole[0].group_id == 1){
      window.location.href = process.env.PUBLIC_URL + "/usermanagement";
    }

    if(selectedRole[0].group_id == 2){
      window.location.href = process.env.PUBLIC_URL + "/taskkepsek";
    }

    if(selectedRole[0].group_id == 3){
      window.location.href = process.env.PUBLIC_URL + "/taskortu";
    }

    if(selectedRole[0].group_id == 4){
      window.location.href = process.env.PUBLIC_URL + "/taskguru";
    }

    if(selectedRole[0].group_id == 5){
      window.location.href = process.env.PUBLIC_URL + "/taskguardian";
    }

    if(selectedRole[0].group_id == 6){ 
      window.location.href = process.env.PUBLIC_URL + "/tasksiswa";
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

export function* logout() {
  try {
    yield put({
      type: SET_LOADER,
      value: true
    });
    const _response = yield call(services.GET, API_BASE_URL_DEV + API_PATH.logout, HeaderAuth());
    yield put({
      type: SET_LOADER,
      value: false
    });
    localStorage.clear()
    window.location.href = process.env.PUBLIC_URL + "/login";
  } catch (error) {
    yield put({
      type: SET_LOADER,
      value: false
    });
    fail(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(SET_LOGIN, login),
    takeEvery(SET_GOOGLE_LOGIN, googleLogin),
    takeEvery(SET_CONFIRM_LOGIN, confirmLogin),
    takeEvery(SET_LOGOUT, logout)
  ]);
}
