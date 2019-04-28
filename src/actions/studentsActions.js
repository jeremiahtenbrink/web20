import { store } from "../firebase/firebase";

export const FETCH_STUDENTS_INIT = "FETCH_STUDENTS_INIT";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILED = "FETCH_STUDENTS_FAILED";

export const getStudents = id => dispatch => {
  dispatch({ type: FETCH_STUDENTS_INIT });
  if(id){
    store
    .collection("users")
    .doc(id)
    .collection("students")
    .get()
    .then(students => {
      console.log(students)
      students.forEach(student => )
      console.log(allStudentsData);
      dispatch({
        type: FETCH_STUDENTS_SUCCESS,
        payload: allStudentsData
      });
    })
    .catch(err => {
      dispatch({ type: FETCH_STUDENTS_FAILED, payload: err });
    });
  }
  else {
    dispatch({type: FETCH_STUDENTS_FAILED})
  }
};

export const ADD_STUDENT_INIT = "ADD_STUDENT_INIT";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const ADD_STUDENT_FAILED = "ADD_STUDENT_FAILED";

export const addStudent = ({ student, uid }) => dispatch => {
  dispatch({ type: ADD_STUDENT_INIT });
};
