import {
  EDIT_EXAM,
  SELECT_QUESTIONS,
  CLOSE_SELECT_QUESTIONS,
  AVAILABLE_QUESTIONS,
  CREATE_EXAM_MODAL,
  CLOSE_CREATE_EXAM_MODAL
} from "../utils";

export const editExamAction = examID => {
  return {
    type: EDIT_EXAM,
    payload: examID
  };
};

export const selectQuestionsAction = () => {
  return {
    type: SELECT_QUESTIONS
  };
};

export const submitSelectQuestions = () => {
  return {
    type: CLOSE_SELECT_QUESTIONS
  };
};

export const cancelSelectQuestions = () => {
  return {
    type: CLOSE_SELECT_QUESTIONS
  };
};

export const setAvailableQuestions = data => {
  return {
    type: AVAILABLE_QUESTIONS,
    payload: data
  };
};

export const createExamModal = () => {
  return {
    type: CREATE_EXAM_MODAL
  };
};

export const submitCreateExamModal = () => {
  return {
    type: CLOSE_CREATE_EXAM_MODAL
  };
};

export const cancelCreateExamModal = () => {
  return {
    type: CLOSE_CREATE_EXAM_MODAL
  };
};
