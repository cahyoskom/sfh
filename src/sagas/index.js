import { all } from 'redux-saga/effects';

// Import sagas
import account from './account';
import adminAdsAproval from './adminadsaproval';

export default function* rootSaga(getState) {
  yield all(
    [
      account(),
      adminAdsAproval()
    ]
  );
}
