import { all } from 'redux-saga/effects';

// Import sagas
import account from './account';

export default function* rootSaga(getState) {
  yield all([account()]);
}
