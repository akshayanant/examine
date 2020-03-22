import { EDIT_EXAM } from "../utils";

export const editExamAction = examID => {
  return {
    type: EDIT_EXAM,
    payload: examID
  };
};
