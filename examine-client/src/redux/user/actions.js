import { USER_ENTRY, USER_EXIT } from "./actionNames";
import axios from "axios";

export const userEntry = data => {
  const tokenID = `Bearer ${data}`;
  localStorage.setItem("tokenID", tokenID);
  axios.defaults.headers.common["Authorization"] = tokenID;
  return {
    type: USER_ENTRY
  };
};

export const logout = () => {
  localStorage.removeItem("tokenID");
  delete axios.defaults.headers.common["Authorization"];
  return {
    type: USER_EXIT
  };
};
