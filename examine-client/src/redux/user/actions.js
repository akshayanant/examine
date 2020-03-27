import { USER_ENTRY } from "./actionNames";

export const userEntry = data => {
  return {
    type: USER_ENTRY,
    payload: data
  };
};
