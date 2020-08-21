import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';

// Import custom components
import accountReducer from './account';
import taskSiswaReducer from './tasksiswa';
import taskOrtuReducer from './taskortu';
import taskKepsekReducer from './taskkepsek';
import taskGuruReducer from './taskguru';
import adminReducer from './admin';
import profileReducer from './profile';
import schoolReducer from './school';
import classReducer from './classinfo';
import userReducer from './manageuser';
import landingReducer from './landing';
import taskReducer from './task';

const rootReducer = combineReducers({
  account: accountReducer,
  taskSiswa: taskSiswaReducer,
  taskOrtu: taskOrtuReducer,
  taskKepsek: taskKepsekReducer,
  taskGuru: taskGuruReducer,
  admin: adminReducer,
  profile: profileReducer,
  school: schoolReducer,
  class: classReducer,
  manageUser: userReducer,
  landingpage: landingReducer,
  task: taskReducer,
  Intl
});

export default rootReducer;
