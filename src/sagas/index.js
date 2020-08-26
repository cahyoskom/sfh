import { all } from 'redux-saga/effects';
import account from './account';
import admin from './admin';
import taskSiswa from './tasksiswa';
import taskOrtu from './taskortu';
import taskKepsek from './taskkepsek';
import taskGuru from './taskguru';
import profile from './profile';
import school from './school';
import classinfo from './classinfo';
import landing from './landing';
import task from './task';

export default function* rootSaga(getState) {
  yield all([
    account(),
    taskSiswa(),
    taskOrtu(),
    taskKepsek(),
    taskGuru(),
    admin(),
    profile(),
    school(),
    classinfo(),
    landing(),
    task()
  ]);
}
