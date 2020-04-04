import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST,
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
} from "./actionNames";
import axios from "axios";

export const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const userLoginSuccess = (data) => {
  const tokenID = `Bearer ${data.tokenID}`;
  localStorage.setItem("tokenID", tokenID);
  axios.defaults.headers.common["Authorization"] = tokenID;
  return {
    type: USER_LOGIN_SUCCESS,
  };
};

export const userLoginError = (data) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: data.error,
  };
};

export const userLogin = (user) => {
  return (dispatch) => {
    dispatch(userLoginRequest());
    axios
      .post("/signin", user)
      .then((res) => {
        dispatch(userLoginSuccess(res.data));
      })
      .catch((err) => {
        dispatch(userLoginError(err));
      });
  };
};

export const userSignUpRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const userSignUpSuccess = (data) => {
  const tokenID = `Bearer ${data.tokenID}`;
  localStorage.setItem("tokenID", tokenID);
  axios.defaults.headers.common["Authorization"] = tokenID;
  return {
    type: USER_SIGNUP_SUCCESS,
  };
};

export const userSignUp = (user) => {
  return (dispatch) => {
    dispatch(userSignUpRequest());
    axios
      .post("/signup", user)
      .then((res) => {
        dispatch(userSignUpSuccess(res.data));
      })
      .catch((err) => {});
  };
};

export const userLogoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST,
  };
};

export const userLogoutSuccess = (data) => {
  localStorage.removeItem("tokenID");
  delete axios.defaults.headers.common["Authorization"];
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export const userLogout = (user) => {
  return (dispatch) => {
    dispatch(userLogoutRequest());
    axios
      .post("/signout")
      .then((res) => {
        dispatch(userLogoutSuccess(res.data));
      })
      .catch((err) => {});
  };
};

const fetchAvailableExamsRequest = () => {
  return {
    type: FETCH_AVAILABLE_EXAMS_REQUEST,
  };
};

const fetchAvailableExamsSuccess = (data) => {
  return {
    type: FETCH_AVAILABLE_EXAMS_SUCCESS,
    payload: data,
  };
};

export const fetchAvailableExams = () => {
  return (dispatch) => {
    dispatch(fetchAvailableExamsRequest());
    axios.defaults.headers.common["Authorization"] = localStorage.tokenID;
    axios
      .get("/availableexams")
      .then((res) => {
        const availableExams = res.data;
        availableExams.forEach((exam) => {
          axios.get(`/getexamdetails/${exam.examID}`).then((res) => {
            dispatch(
              fetchAvailableExamsSuccess({
                examID: exam.examID,
                exam: res.data.exam,
              })
            );
          });
        });
      })
      .catch((err) => {});
  };
};

const fetchPastExamsRequest = () => {
  return {
    type: FETCH_PAST_EXAMS_REQUEST,
  };
};

const fetchPastExamsSuccess = (data) => {
  return {
    type: FETCH_PAST_EXAMS_SUCCESS,
    payload: data,
  };
};

export const fetchPastExams = () => {
  return (dispatch) => {
    dispatch(fetchPastExamsRequest());
    axios.defaults.headers.common["Authorization"] = localStorage.tokenID;
    axios
      .get("/pastexams")
      .then((res) => {
        const pastExams = res.data;
        pastExams.forEach((exam) => {
          axios.get(`/getexamdetails/${exam.examID}`).then((res) => {
            dispatch(
              fetchPastExamsSuccess({
                examID: exam.examID,
                exam: res.data.exam,
              })
            );
          });
        });
      })
      .catch((err) => {});
  };
};

const startExamRequest = () => {
  return {
    type: START_EXAM_REQUEST,
  };
};

const startExamSuccess = (data) => {
  return {
    type: START_EXAM_SUCCESS,
    payload: data,
  };
};

const fetchExamDetails = (examID, submissionID) => {
  console.log(examID);
  return (dispatch) => {
    axios.get(`/getexamdetails/${examID}`).then((res) => {
      const attemptDetails = {
        submissionID: submissionID,
        exam: res.data.exam,
      };
      console.log(attemptDetails);
      dispatch(startExamSuccess(attemptDetails));
    });
  };
};

export const startExam = (examID) => {
  return (dispatch) => {
    dispatch(startExamRequest());
    axios.defaults.headers.common["Authorization"] = localStorage.tokenID;
    axios
      .post("/startexam", { examID })
      .then((res) => {
        console.log(res.data);
        const submissionID = res.data.submissionID;
        dispatch(fetchExamDetails(examID, submissionID));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchQuestionRequest = () => {
  return {
    type: FETCH_QUESTION_REQUEST,
  };
};

const fetchQuestionSuccess = (data) => {
  return {
    type: FETCH_QUESTION_SUCCESS,
    payload: data,
  };
};

export const fetchQuestionDetails = (questionID) => {
  return (dispatch) => {
    dispatch(fetchQuestionRequest());
    axios.fetch(`/getquestiondetails/${questionID}`).then((res) => {
      dispatch(fetchQuestionSuccess(res.data));
    });
  };
};

const submitExamRequest = () => {
  return {
    type: SUBMIT_EXAM_REQUEST,
  };
};

const submitExamSuccess = () => {
  return {
    type: SUBMIT_EXAM_SUCCESS,
  };
};

export const submitExam = (submissionID, answers) => {
  return (dispatch) => {
    dispatch(submitExamRequest());
    const submission = {
      submissionID: submissionID,
      answers: answers,
    };
    axios
      .post("/submitexam", submission)
      .then((res) => {
        console.log(res.data);
        dispatch(submitExamSuccess());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
