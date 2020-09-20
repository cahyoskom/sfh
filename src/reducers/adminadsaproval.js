import {
  ADMIN_APROVAL_GET_DATA_ADS_SUCCESS,
  ADMIN_APROVAL_GET_DETAIL_DATA_ADS_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  data: {},
};

export default function adminAdsAproval(state = initialState, action) {
  switch (action.type) {
    case ADMIN_APROVAL_GET_DATA_ADS_SUCCESS:
      console.log("Reducer : ", action.value.data.data);
      return {
        ...state,
        // data: action.value.listAds    //kalo pake saga langsung tanpa api
        data: action.value.data.data
      };
    case ADMIN_APROVAL_GET_DETAIL_DATA_ADS_SUCCESS:
      console.log("Reducer : ", action);
      return {
        ...state,
        data: action.value.data.data,
      };
    default:
  }
  return state;
}

