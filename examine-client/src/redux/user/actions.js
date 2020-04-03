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
  FETCH_PAST_EXAMS_SUCCESS
} from "./actionNames";
import axios from "axios";

export const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST
  };
};

export const userLoginSuccess = data => {
  const tokenID = `Bearer ${data.tokenID}`;
  localStorage.setItem("tokenID", tokenID);
  axios.defaults.headers.common["Authorization"] = tokenID;
  return {
    type: USER_LOGIN_SUCCESS
  };
};

export const userLoginError = data => {
  console.log(data);
  return {
    type: USER_LOGIN_ERROR,
    payload: data.error
  };
};

export const userLogin = user => {
  return dispatch => {
    dispatch(userLoginRequest());
    axios
      .post("/signin", user)
      .then(res => {
        dispatch(userLoginSuccess(res.data));
      })
      .catch(err => {
        dispatch(userLoginError(err));
      });
  };
};

export const userSignUpRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST
  };
};

export const userSignUpSuccess = data => {
  const tokenID = `Bearer ${data.tokenID}`;
  localStorage.setItem("tokenID", tokenID);
  axios.defaults.headers.common["Authorization"] = tokenID;
  return {
    type: USER_SIGNUP_SUCCESS
  };
};

export const userSignUp = user => {
  return dispatch => {
    dispatch(userSignUpRequest());
    axios
      .post("/signup", user)
      .then(res => {
        dispatch(userSignUpSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const userLogoutRequest = () => {
  return {
    type: USER_LOGOUT_REQUEST
  };
};

export const userLogoutSuccess = data => {
  localStorage.removeItem("tokenID");
  delete axios.defaults.headers.common["Authorization"];
  return {
    type: USER_LOGOUT_SUCCESS
  };
};

export const userLogout = user => {
  return dispatch => {
    dispatch(userLogoutRequest());
    axios
      .post("/signout")
      .then(res => {
        console.log(res.data);
        dispatch(userLogoutSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const fetchAvailableExamsRequest = () => {
  return {
    type: FETCH_AVAILABLE_EXAMS_REQUEST
  };
};

const fetchAvailableExamsSuccess = data => {
  return {
    type: FETCH_AVAILABLE_EXAMS_SUCCESS,
    payload: data
  };
};

export const fetchAvailableExams = () => {
  return dispatch => {
    dispatch(fetchAvailableExamsRequest());
    axios.defaults.headers.common["Authorization"] = localStorage.tokenID;
    axios
      .get("/availableexams")
      .then(res => {
        const availableExams = res.data;
        availableExams.forEach(exam => {
          axios.get(`/getexamdetails/${exam.examID}`).then(res => {
            console.log(res.data);
            dispatch(
              fetchAvailableExamsSuccess({
                examID: exam.examID,
                exam: res.data.exam
              })
            );
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const fetchPastExamsRequest = () => {
  return {
    type: FETCH_PAST_EXAMS_REQUEST
  };
};

const fetchPastExamsSuccess = data => {
  return {
    type: FETCH_PAST_EXAMS_SUCCESS,
    payload: data
  };
};

export const fetchPastExams = () => {
  return dispatch => {
    dispatch(fetchPastExamsRequest());
    axios.defaults.headers.common["Authorization"] = localStorage.tokenID;
    axios
      .get("/pastexams")
      .then(res => {
        const pastExams = res.data;
        pastExams.forEach(exam => {
          axios.get(`/getexamdetails/${exam.examID}`).then(res => {
            console.log(res.data);
            dispatch(
              fetchPastExamsSuccess({
                examID: exam.examID,
                exam: res.data.exam
              })
            );
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
