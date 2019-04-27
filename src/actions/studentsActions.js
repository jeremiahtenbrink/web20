import { store } from "../firebase/firebase";

export const FETCH_STUDENTS_INIT = "FETCH_STUDENTS_INIT";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILED = "FETCH_STUDENTS_FAILED";

export const getStudents = id => dispatch => {
  dispatch({ type: FETCH_STUDENTS_INIT });
  store
    .collection("users")
    .docs(id)
    .collection("students")
    .get()
    .then(students => {
      let allStudentsData = students.map(student => student.data());
      dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: allStudentsData });
    })
    .catch(err => {
      dispatch({ type: FETCH_STUDENTS_FAILED, payload: err });
    });
};
