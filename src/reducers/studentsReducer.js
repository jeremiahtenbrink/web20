import {
  FETCH_STUDENTS_INIT,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILED,
  ADD_STUDENT_INIT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILED
} from "../actions";

const initialState = {
  students: null,
  isLoading: true,
  isAdding: false,
  error: "",
};

export const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT_INIT: 
      return {...state, isAdding: true}
    case ADD_STUDENT_SUCCESS: 
      return {...state, students: {...state.students, [action.payload.id]:  action.payload}, isAdding: false}
    case FETCH_STUDENTS_INIT:
      return {...state, isLoading: true}
    case FETCH_STUDENTS_SUCCESS: 
      return {...state, isLoading: false, students: action.payload};
    default: 
      return state
  }
};
