import {
  USER_LOGOUT_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_ERROR,
  FETCH_ALL_EXAMS_REQUEST,
  FETCH_ALL_EXAMS_SUCCESS,
  FETCH_AVAILABLE_EXAMS_REQUEST,
  FETCH_AVAILABLE_EXAMS_SUCCESS
} from "./actionNames";

const init = {
  loading: false,
  authorized: false,
  authError: false,
  allExams: [],
  availableExams: [],
  loadingAvailableExams: false,
  loadingAllExams: false
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

    case FETCH_ALL_EXAMS_REQUEST:
      return {
        ...state,
        loadingAllExams: true
      };

    case FETCH_ALL_EXAMS_SUCCESS:
      return {
        ...state,
        loadingAllExams: false,
        allExams: [...action.payload]
      };

    case FETCH_AVAILABLE_EXAMS_REQUEST:
      return {
        ...state,
        loadingAvailableExams: true
      };

    case FETCH_AVAILABLE_EXAMS_SUCCESS:
      let availableExams = [...state.availableExams];
      availableExams.push(action.payload);
      return {
        ...state,
        loadingAvailableExams: false,
        availableExams: availableExams
      };

    default:
      return {
        ...state
      };
  }
};
