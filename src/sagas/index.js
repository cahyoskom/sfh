import { all } from 'redux-saga/effects';
import account from './account'
import taskSiswa from './tasksiswa';
import taskOrtu from './taskortu';
import taskKepsek from './taskkepsek';
import taskGuru from './taskguru';

export default function* rootSaga(getState) {
  yield all([
    account(),
    taskSiswa(),
    taskOrtu(),
    taskKepsek(),
    taskGuru(),
  ]);
}
