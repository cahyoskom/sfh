import { GET_USER_DATA, REQUEST_USER_DATA } from "../constants/ActionTypes";

const initialState = {
  data: {
    name: "Fakhrul",
    email: "affauzi06@gmail.com",
    phone: "082113369110",
    avatar: "",
  },
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        data: action.value,
      };
    default:
  }
  return state;
}
