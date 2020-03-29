import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_REQUEST
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

export const userLogin = user => {
  return dispatch => {
    dispatch(userLoginRequest());
    axios
      .post("/signin", user)
      .then(res => {
        dispatch(userLoginSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
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
