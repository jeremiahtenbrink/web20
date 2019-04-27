import {
  SIGNIN_INIT,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  SIGNIN_NEW_USER,
  CREATE_USER_INIT,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED
} from "../actions";

const initialState = {
  isLoading: false,
  user: null,
  uid: null,
  newUser: false,
  token: "",
  error: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_INIT:
      return { ...state, isLoading: true };
    case SIGNIN_NEW_USER:
      return {
        ...state,
        newUser: true,
        user: action.payload,
        token: action.token
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        token: action.token
      };
    case SIGNIN_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case CREATE_USER_INIT: 
      return { ...state, isLoading: true}
    default:
      return state;
  }
};
