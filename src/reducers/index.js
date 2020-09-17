import { combineReducers } from 'redux';
import { IntlReducer as Intl } from 'react-redux-multilingual';

// Import reducers
import accountReducer from './account';
import admAdsAprovalReducer from './adminadsaproval';


const rootReducer = combineReducers({
  account: accountReducer,
  admAdsAproval: admAdsAprovalReducer,
  Intl
});

export default rootReducer;
