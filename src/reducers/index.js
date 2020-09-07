import { combineReducers } from 'redux';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';

// Import custom components
import accountReducer from './account';
import adminReducer from './admin';
import userReducer from './manageuser';

const rootReducer = combineReducers({
  account: accountReducer,
  admin: adminReducer,
  manageUser: userReducer,
  Intl
});

export default rootReducer;
