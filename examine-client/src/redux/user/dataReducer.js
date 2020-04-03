import {
  USER_LOGOUT_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_ERROR,
  FETCH_AVAILABLE_EXAMS_REQUEST,
  FETCH_AVAILABLE_EXAMS_SUCCESS,
  FETCH_PAST_EXAMS_REQUEST,
  FETCH_PAST_EXAMS_SUCCESS,
  START_EXAM_REQUEST,
  START_EXAM_SUCCESS
} from "./actionNames";

const init = {
  loading: false,
  authorized: false,
  authError: false,
  pastExams: [],
  availableExams: [],
  loadingAvailableExams: false,
  loadingPastExams: false,
  startingExam: false,
  attemptDetails: {
    exam: {},
    submissionID: ""
  }
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

    case FETCH_PAST_EXAMS_REQUEST:
      return {
        ...state,
        loadingPastExams: true
      };

    case FETCH_PAST_EXAMS_SUCCESS:
      let pastExams = [...state.pastExams];
      pastExams.push(action.payload);
      return {
        ...state,
        loadingPastExams: false,
        pastExams: pastExams
      };

    case START_EXAM_REQUEST:
      return {
        ...state,
        startingExam: true
      };

    case START_EXAM_SUCCESS:
      return {
        ...state,
        attemptDetails: action.payload,
        startingExam: false
      };

    default:
      return {
        ...state
      };
  }
};
