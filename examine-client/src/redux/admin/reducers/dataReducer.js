import { EDIT_EXAM } from "./../utils";

const init = {
  editingExamID: ""
};

export const dataReducer = (state = init, action) => {
  switch (action.type) {
    case EDIT_EXAM:
      console.log(action.payload);
      return {
        ...state,
        editingExamID: action.payload
      };
    default:
      return state;
  }
};
