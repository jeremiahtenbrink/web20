import { store } from "../firebase/firebase";

export const FETCH_STUDENTS_INIT = "FETCH_STUDENTS_INIT";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILED = "FETCH_STUDENTS_FAILED";

export const getStudents = id => dispatch => {
    dispatch( { type: FETCH_STUDENTS_INIT } );
    if( id ){
        store
            .collection( "students" )
            .where( "pm", "==", id )
            .get()
            .then( students => {
                let studentData = [];
                students.forEach( student => {
                    studentData.push( {
                        id: student.id, ...student.data(),
                    } );
                } );
                
                dispatch( {
                    type: FETCH_STUDENTS_SUCCESS, payload: studentData,
                } );
            } )
            .catch( err => {
                dispatch( { type: FETCH_STUDENTS_FAILED, payload: err } );
            } );
    }else{
        dispatch( { type: FETCH_STUDENTS_FAILED } );
    }
};

export const ADD_STUDENT_INIT = "ADD_STUDENT_INIT";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const ADD_STUDENT_FAILED = "ADD_STUDENT_FAILED";

export const addStudent = ( { student, id } ) => dispatch => {
    
    dispatch( { type: ADD_STUDENT_INIT } );
    student.pm = id;
    store
        .collection( "students" )
        .add( student )
        .then( res => {
            dispatch( {
                type: ADD_STUDENT_SUCCESS, payload: { id: res.id, ...student },
            } );
        } );
};

export const DEL_STUDENT_INIT = "DEL_STUDENT_INIT";
export const DEL_STUDENT_SUCCESS = "DEL_STUDENT_SUCCESS";
export const DEL_STUDENT_FAILED = "DEL_STUDENT_FAILED";

export const delStudent = ( studentId ) => dispatch => {
    dispatch( { type: DEL_STUDENT_INIT } );
    store
        .collection( "students" )
        .doc( studentId )
        .delete()
        .then( res => {
            dispatch( {
                type: DEL_STUDENT_SUCCESS, payload: studentId,
            } );
        } )
        .catch( err => {
            dispatch( { type: DEL_STUDENT_FAILED, payload: err } );
        } );
};

export const EDIT_STUDENT_INIT = "EDIT_STUDENT_INIT";
export const EDIT_STUDENT_SUCCESS = "EDIT_STUDENT_SUCCESS";
export const EDIT_STUDENT_FAILED = "EDIT_STUDENT_FAILED";

export const editStudent = ( student ) => dispatch => {
    dispatch( { type: EDIT_STUDENT_INIT } );
    store
        .collection( "students" )
        .doc( student.id )
        .update( student )
        .then( () => {
            dispatch( {
                type: EDIT_STUDENT_SUCCESS, payload: student,
            } );
        } )
        .catch( err => {
            dispatch( { type: EDIT_STUDENT_FAILED, payload: err } );
        } );
};

export const COLLECT_STUDENT_LESSONS_INIT = "COLLECT_STUDENT_LESSONS_INIT";
export const COLLECT_STUDENT_LESSONS_SUCCESS = "COLLECT_STUDENT_LESSONS_SUCCESS";
export const COLLECT_STUDENT_LESSONS_FAILED = "COLLECT_STUDENT_LESSONS_FAILED";

export const getStudentLessons = ( student, userId ) => dispatch => {
   
    dispatch( { type: COLLECT_STUDENT_LESSONS_INIT } );
    store.collection( "students" )
        .doc( student.id ).get().then( ( res ) => {
            
            if( res.exists ){
                let studentData = res.data();
                store.collection( "students" )
                    .doc( student.id )
                    .collection( "lessons" )
                    .get()
                    .then( ( lessons ) => {
                        let studentLessons = {};
                        lessons.docs.forEach( lesson => {
                            studentLessons[ lesson.id ] = lesson.data();
                        } );
                        if( !lessons.empty ){
                            dispatch( {
                                type: COLLECT_STUDENT_LESSONS_SUCCESS,
                                payload: studentLessons
                            } );
                        }else{
                            dispatch( {
                                
                                type: COLLECT_STUDENT_LESSONS_SUCCESS, payload: []
                            } );
                        }
                    } )
                    .catch( err => {
                        dispatch( {
                            type: COLLECT_STUDENT_LESSONS_FAILED, payload: err
                        } );
                    } );
            }else{
                student.PM = userId;
                store.collection( "students" )
                    .doc( student.id )
                    .set( student )
                    .then( res => {
                        console.log( res );
                    } );
            }
        } )
        .catch( err => {
            dispatch( {
                type: COLLECT_STUDENT_LESSONS_FAILED, payload: err
            } );
        } );
};

export const COMPLETE_LESSON_INIT = "COMPLETE_LESSON_INIT";
export const COMPLETE_LESSON_SUCCESS = "COMPLETE_LESSON_SUCCESS";
export const COMPLETE_LESSON_FAILED = "COMPLETE_LESSON_FAILED";

export const completeStudentLesson = ( student, lesson ) => dispatch => {
    
    dispatch( { type: COMPLETE_LESSON_INIT } );
    store.collection( "students" )
        .doc( student.id )
        .collection( "lessons" )
        .doc( lesson.id )
        .set( lesson )
        .then( ( res ) => {
            
            dispatch( {
                type: COMPLETE_LESSON_SUCCESS, payload: lesson
            } );
        } )
        .catch( err => {
            dispatch( {
                type: COMPLETE_LESSON_FAILED, payload: err
            } );
        } );
};

export const CHANGE_SELECTED_STUDENT = "CHANGE_SELECTED_STUDENT";

export const changeSelectedStudent = studentId => dispatch => {
    dispatch( { type: CHANGE_SELECTED_STUDENT, payload: studentId } );
};

