import {store} from '../firebase/firebase';

export const FETCH_STUDENTS_INIT = 'FETCH_STUDENTS_INIT';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILED = 'FETCH_STUDENTS_FAILED';

export const getStudents = id => dispatch => {
  dispatch({type: FETCH_STUDENTS_INIT});
  if (id) {
    store
      .collection('users')
      .doc(id)
      .collection('students')
      .orderBy('firstName')
      .get()
      .then(students => {
        let studentData = [];
        students.forEach(student => {
          studentData.push({
            id: student.id,
            ...student.data(),
          });
        });
        studentData.forEach((student, index) => {
          studentData[index] = {
            ...student,
            key: index,
          };
        });
        dispatch({
          type: FETCH_STUDENTS_SUCCESS,
          payload: studentData,
        });
      })
      .catch(err => {
        dispatch({type: FETCH_STUDENTS_FAILED, payload: err});
      });
  } else {
    dispatch({type: FETCH_STUDENTS_FAILED});
  }
};

export const ADD_STUDENT_INIT = 'ADD_STUDENT_INIT';
export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS';
export const ADD_STUDENT_FAILED = 'ADD_STUDENT_FAILED';

export const addStudent = ({student, id}) => dispatch => {
  dispatch({type: ADD_STUDENT_INIT});
  store
    .collection('users')
    .doc(id)
    .collection('students')
    .add({
      ...student,
    })
    .then(res => {
      dispatch({
        type: ADD_STUDENT_SUCCESS,
        payload: {id: res.id, ...student},
      });
    });
};

export const DEL_STUDENT_INIT = 'DEL_STUDENT_INIT';
export const DEL_STUDENT_SUCCESS = 'DEL_STUDENT_SUCCESS';
export const DEL_STUDENT_FAILED = 'DEL_STUDENT_FAILED';

export const delStudent = (studentId, userId) => dispatch => {
  dispatch({type: DEL_STUDENT_INIT});
  store
    .collection('users')
    .doc(userId)
    .collection('students')
    .doc(studentId)
    .delete()
    .then(res => {
      dispatch({
        type: DEL_STUDENT_SUCCESS,
        payload: studentId,
      });
    })
    .catch(err => {
      dispatch({type: DEL_STUDENT_FAILED, payload: err});
    });
};

export const EDIT_STUDENT_INIT = 'EDIT_STUDENT_INIT';
export const EDIT_STUDENT_SUCCESS = 'EDIT_STUDENT_SUCCESS';
export const EDIT_STUDENT_FAILED = 'EDIT_STUDENT_FAILED';

export const editStudent = (student, userId) => dispatch => {
  dispatch({type: EDIT_STUDENT_INIT});
  store
    .collection('users')
    .doc(userId)
    .collection('students')
    .doc(student.id)
    .update(student)
    .then(() => {
      dispatch({
        type: EDIT_STUDENT_SUCCESS,
        payload: student,
      });
    })
    .catch(err => {
      dispatch({type: EDIT_STUDENT_FAILED, payload: err});
    });
};

export const GENERATE_STUDENT_LINK_INIT = 'GENERATE_STUDENT_LINK_INIT';
export const GENERATE_STUDENT_LINK_SUCCESS = 'GENERATE_STUDENT_LINK_SUCCESS';
export const GENERATE_STUDENT_LINK_FAILED = 'GENERATE_STUDENT_LINK_FAILED';

export const generateStudentLink = (studentId, userId) => dispatch => {
  dispatch({type: GENERATE_STUDENT_LINK_INIT});
  store
    .collection('students')
    .add({
      ref: store
        .collection('/users')
        .doc(userId)
        .collection('students')
        .doc(studentId),
    })
    .then(res => {
      let payload = {id: studentId, link: res.id};
      dispatch({
        type: GENERATE_STUDENT_LINK_SUCCESS,
        payload,
      });
      store
        .collection('/users')
        .doc(userId)
        .collection('/students')
        .doc(studentId)
        .update({link: res.id})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      dispatch({type: GENERATE_STUDENT_LINK_FAILED, payload: err});
    });
};
