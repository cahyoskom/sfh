import { all } from "redux-saga/effects";
import account from "./account";
import admin from "./admin";
import taskSiswa from "./tasksiswa";
import taskOrtu from "./taskortu";
import taskKepsek from "./taskkepsek";
import taskGuru from "./taskguru";
import classinfo from "./classinfo";

export default function* rootSaga(getState) {
  yield all([
    classinfo(),
    account(),
    taskSiswa(),
    taskOrtu(),
    taskKepsek(),
    taskGuru(),
    admin(),
  ]);
}
