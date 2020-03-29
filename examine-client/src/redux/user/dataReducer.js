import {
  USER_LOGOUT_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_ERROR
} from "./actionNames";

const init = {
  loading: false,
  authorized: false,
  authError: false
};

export const dataReducer = (state = init, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        authError: false
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        authError: true
      };

    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        authError: false
      };

    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: false
      };

    default:
      return {
        ...state
      };
  }
};
