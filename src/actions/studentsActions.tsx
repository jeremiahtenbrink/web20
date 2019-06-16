import { store } from "../firebase/firebase";
import { action } from "./action";
import { IStudent } from "../types/StudentInterface";
import { ILesson } from "../types/LessonInterface";
import { ISprint } from "../types/SprintInterface";
import { IStudentLesson } from "../types/StudentLessonsInterface";

export const FETCH_STUDENTS_INIT = "FETCH_STUDENTS_INIT";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILED = "FETCH_STUDENTS_FAILED";

export const subscribeToStudents = id => dispatch => {
    
    dispatch( action( FETCH_STUDENTS_INIT ) );
    if ( id ) {
        return store
            .collection( "students" )
            .where( "pm", "==", id )
            .onSnapshot( snapshot => {
                const students = {};
                snapshot.forEach( student => {
                    let data = student.data();
                    data.id = student.id;
                    students[ data.id ] = data;
                } );
                dispatch( action( FETCH_STUDENTS_SUCCESS, students ) );
            }, err => {
                console.log( err );
            } );
        
    } else {
        console.log( "Need user id to fetch students." );
        dispatch( action( FETCH_STUDENTS_FAILED ) );
    }
};

export const ADD_STUDENT_INIT = "ADD_STUDENT_INIT";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const ADD_STUDENT_FAILED = "ADD_STUDENT_FAILED";

export const addStudent = ( props: { student: IStudent, id: string } ) =>
    dispatch => {
        
        dispatch( { type: ADD_STUDENT_INIT } );
        props.student.pm = props.id;
        store
            .collection( "students" )
            .add( props.student )
            .then( res => {
                dispatch( {
                    type: ADD_STUDENT_SUCCESS,
                    payload: { id: res.id, ...props.student },
                } );
            } );
    };

export const DEL_STUDENT_INIT = "DEL_STUDENT_INIT";
export const DEL_STUDENT_SUCCESS = "DEL_STUDENT_SUCCESS";
export const DEL_STUDENT_FAILED = "DEL_STUDENT_FAILED";

export const delStudent = ( studentId: string ) => dispatch => {
    
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

export const editStudent = ( student: IStudent ) => dispatch => {
    
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

export const getStudentLessons = ( student: IStudent, userId: string ) =>
    dispatch => {
        
        dispatch( { type: COLLECT_STUDENT_LESSONS_INIT } );
        store.collection( "students" )
            .doc( student.id ).get().then( ( res ) => {
            
            if ( res.exists ) {
                store.collection( "students" )
                    .doc( student.id )
                    .collection( "lessons" )
                    .get()
                    .then( ( lessons ) => {
                        let studentLessons = {};
                        lessons.docs.forEach( lesson => {
                            studentLessons[ lesson.id ] = lesson.data();
                        } );
                        if ( !lessons.empty ) {
                            dispatch( {
                                type: COLLECT_STUDENT_LESSONS_SUCCESS,
                                payload: studentLessons
                            } );
                        } else {
                            dispatch( {
                                
                                type: COLLECT_STUDENT_LESSONS_SUCCESS,
                                payload: []
                            } );
                        }
                    } )
                    .catch( err => {
                        dispatch( {
                            type: COLLECT_STUDENT_LESSONS_FAILED, payload: err
                        } );
                    } );
            } else {
                student.pm = userId;
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

export const completeStudentLesson = ( student: IStudent,
                                       lesson: IStudentLesson | ISprint ) =>
    dispatch => {
        
        dispatch( { type: COMPLETE_LESSON_INIT } );
        store.collection( "students" )
            .doc( student.id )
            .collection( "lessons" )
            .doc( lesson.id )
            .set( lesson )
            .then( ( res ) => {
                
                dispatch( action( COMPLETE_LESSON_SUCCESS, lesson ) );
            } )
            .catch( err => {
                dispatch( action( COMPLETE_LESSON_FAILED, err ) );
            } );
    };

export const CHANGE_SELECTED_STUDENT = "CHANGE_SELECTED_STUDENT";

export const changeSelectedStudent = studentId => dispatch => {
    dispatch( { type: CHANGE_SELECTED_STUDENT, payload: studentId } );
};

export const copySprints = () => dispatch => {
    
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sprints" )
        .get()
        .then( ( res ) => {
            
            //create the sprint in the course
            res.docs.forEach( sprintFDB => {
                let sprint = sprintFDB.data();
                sprint.id = sprintFDB.id;
                store.collection( "autoFill" )
                    .doc( "web" )
                    .collection( "courses" )
                    .doc( "FSW" )
                    .collection( "sprints" )
                    .doc( sprint.id )
                    .set( sprint )
                    .then( res => {
                        console.log(
                            `Created ${ sprint.name } in fsw courses.` );
                    } )
                    .catch( err => {
                        console.log( err );
                    } );
                
                store.collection( "autoFill" )
                    .doc( "web" )
                    .collection( "sprints" )
                    .doc( sprint.id )
                    .collection( "lessons" ).get().then( res => {
                    res.docs.forEach( lesson => {
                        const data = lesson.data();
                        store.collection( "autoFill" )
                            .doc( "web" )
                            .collection( "courses" )
                            .doc( "FSW" )
                            .collection( "sprints" )
                            .doc( sprint.id )
                            .collection( "lessons" )
                            .doc( data.id )
                            .set( data )
                            .then( res => {
                                console.log(
                                    `Created ${ data.name } in ${ sprint.id }` );
                            } ).catch( err => {
                            console.log( err );
                        } );
                    } );
                } );
            } );
            
        } )
        .catch( err => {
            console.log( err );
        } );
};

