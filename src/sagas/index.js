import { all } from 'redux-saga/effects';
import account from './account';
import admin from './admin';

export default function* rootSaga(getState) {
  yield all([account(), admin()]);
}
