import { USER_ENTRY } from "./actionNames";

const init = {
  tokenID: null
};

export const dataReducer = (state = init, action) => {
  switch (action.type) {
    case USER_ENTRY:
      return {
        ...state,
        tokenID: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
