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
  START_EXAM_SUCCESS,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  SUBMIT_EXAM_REQUEST,
  SUBMIT_EXAM_SUCCESS,
  GRADE_SUBMISSION_REQUEST,
  GRADE_SUBMISSION_SUCCESS,
  FETCH_GRADES_REQUEST,
  FETCH_GRADES_SUCCESS,
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
    exam: {
      examName: "",
      duration: 0,
      attempts: 1,
      points: 0,
      questions: [],
    },
    submissionID: "",
  },
  submittingExam: false,
  submitted: false,
  grading: false,
  fetchingGrades: false,
  grade: {
    grading: [],
    points: 0,
    examName: "",
  },
  timerRunning: false,
  timerMinutes: 0,
};

export const dataReducer = (state = init, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        authError: false,
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        authError: true,
      };

    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        authError: false,
      };

    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: false,
        timerRunning: false,
      };

    case FETCH_AVAILABLE_EXAMS_REQUEST:
      return {
        ...state,
        loadingAvailableExams: true,
      };

    case FETCH_AVAILABLE_EXAMS_SUCCESS:
      if (action.payload.length == 0) {
        return {
          ...state,
          loadingAvailableExams: false,
        };
      }
      let availableExams = [...state.availableExams];
      availableExams.push(action.payload);
      return {
        ...state,
        loadingAvailableExams: false,
        availableExams: availableExams,
      };

    case FETCH_PAST_EXAMS_REQUEST:
      return {
        ...state,
        loadingPastExams: true,
      };

    case FETCH_PAST_EXAMS_SUCCESS:
      if (action.payload.length == 0) {
        return {
          ...state,
          loadingPastExams: false,
        };
      }
      let pastExams = [...state.pastExams];
      pastExams.push(action.payload);
      return {
        ...state,
        loadingPastExams: false,
        pastExams: pastExams,
      };

    case START_EXAM_REQUEST:
      return {
        ...state,
        startingExam: true,
      };

    case START_EXAM_SUCCESS:
      return {
        ...state,
        attemptDetails: { ...action.payload },
        startingExam: false,
        timerRunning: true,
      };

    case FETCH_QUESTION_REQUEST:
      const loadingQuestions = state.loadingQuestions + 1;
      return {
        ...state,
        loadingQuestions: loadingQuestions,
      };

    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
      };

    case SUBMIT_EXAM_REQUEST:
      return {
        ...state,
        submittingExam: true,
      };

    case SUBMIT_EXAM_SUCCESS:
      return {
        ...state,
        submittingExam: false,
        submitted: true,
        timerRunning: false,
      };

    case GRADE_SUBMISSION_REQUEST:
      return {
        ...state,
        grading: true,
      };

    case GRADE_SUBMISSION_SUCCESS:
      return {
        ...state,
        grading: false,
      };

    case FETCH_GRADES_REQUEST:
      return {
        ...state,
        fetchingGrades: true,
      };

    case FETCH_GRADES_SUCCESS:
      return {
        ...state,
        grade: { ...action.payload },
        fetchingGrades: false,
      };
    default:
      return {
        ...state,
      };
  }
};
