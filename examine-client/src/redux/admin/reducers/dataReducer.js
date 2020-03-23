import {
  EDIT_EXAM,
  SELECT_QUESTIONS,
  CLOSE_SELECT_QUESTIONS,
  AVAILABLE_QUESTIONS,
  CREATE_EXAM_MODAL,
  CLOSE_CREATE_EXAM_MODAL
} from "./../utils";

const init = {
  editingExamID: "",
  questionsModal: false,
  availableQuestions: [],
  createExamModal: false
};

export const dataReducer = (state = init, action) => {
  switch (action.type) {
    case EDIT_EXAM:
      return {
        ...state,
        editingExamID: action.payload
      };
    case SELECT_QUESTIONS:
      return {
        ...state,
        questionsModal: true
      };

    case CLOSE_SELECT_QUESTIONS:
      return {
        ...state,
        questionsModal: false
      };

    case AVAILABLE_QUESTIONS:
      return {
        ...state,
        availableQuestions: action.payload
      };

    case CREATE_EXAM_MODAL:
      return {
        ...state,
        createExamModal: true
      };

    case CLOSE_CREATE_EXAM_MODAL:
      return {
        ...state,
        createExamModal: false
      };

    default:
      return state;
  }
};
