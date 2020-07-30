import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';

// Import custom components
import accountReducer from './account';
import taskSiswaReducer from './tasksiswa';
import taskOrtuReducer from './taskortu';
import taskKepsekReducer from './taskkepsek';
import taskGuruReducer from './taskguru';
import adminReducer from './admin';

const rootReducer = combineReducers({
  account: accountReducer,
  taskSiswa: taskSiswaReducer,
  taskOrtu: taskOrtuReducer,
  taskKepsek: taskKepsekReducer,
  taskGuru: taskGuruReducer,
  admin: adminReducer,
  Intl
});

export default rootReducer;
