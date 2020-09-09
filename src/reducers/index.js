import { combineReducers } from 'redux';
import { IntlReducer as Intl } from 'react-redux-multilingual';

// Import reducers
import accountReducer from './account';

const rootReducer = combineReducers({
  account: accountReducer,
  Intl
});

export default rootReducer;
