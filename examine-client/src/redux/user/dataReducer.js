import { USER_ENTRY, USER_EXIT } from "./actionNames";

const init = {
  loading: false,
  authorized: false
};

export const dataReducer = (state = init, action) => {
  switch (action.type) {
    case USER_ENTRY:
      return {
        ...state,
        authorized: true
      };
    case USER_EXIT:
      return {
        ...state,
        authorized: false
      };
    default:
      return {
        ...state
      };
  }
};
