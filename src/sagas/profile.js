import { all, takeEvery, put, fork, select, call } from "redux-saga/effects";
import { REQUEST_USER_DATA } from "../constants/ActionTypes";
import { fail, success } from "../components/common/toast-message";
import * as services from "../services";
import { API_BASE_URL_DEV, API_PATH } from "../constants/api";
import { Header, HeaderAuth } from "../services/header";

const getProfileState = (state) => state.profile;
export function* requestUserData(action) {
  console.log("a");
  try {
    const profileState = yield select(getProfileState);
    const getProfile = profileState.profile;

    let param = { id: getProfile.id };
    console.log(param);

    const reqUserData = yield call(
      services.GET,
      API_BASE_URL_DEV + API_PATH.profile + "/" + action.id,
      HeaderAuth()
    );
    console.log(reqUserData);
    yield put({
      type: GET_USER_DATA,
      data: reqUserData.data,
    });
  } catch (e) {
    // yield put(e);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(REQUEST_USER_DATA, requestUserData)]);
}
