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
      let studentData = {}
      students.forEach(student => {
        studentData[student.id] = {
          id: student.id,
          ...student.data()
        }
      })
      console.log(studentData);
      dispatch({
        type: FETCH_STUDENTS_SUCCESS,
        payload: studentData
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

export const addStudent = ({ student, id }) => dispatch => {
  dispatch({ type: ADD_STUDENT_INIT });
  store.collection('users').doc(id).collection('students').add({
    ...student
  }).then(res => {
    console.log(res)
    dispatch({type: ADD_STUDENT_SUCCESS, payload: {id: res.id, ...student}})
  })
};
