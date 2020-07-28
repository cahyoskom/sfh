import { SET_SCHOOL_DATA } from "../constants/ActionTypes";
const initialState = {
  data: {
    // name: "",
    // phone: "",
    // address: "",
    // avatar: "",
    // code: "",
  },
};
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCHOOL_DATA:
      return {
        ...state,
        data: action.value,
      };
    default:
  }
  return state;
}
