import { store } from "../firebase/firebase";
import { GET_COURSES_INIT, GET_COURSES_SUCCESS } from "./autoFillActions";
import { ISprint } from "../types/SprintInterface";
import { ILesson } from "../types/LessonInterface";
import { action } from "./action";


export const ADD_SPRINT_INIT = "ADD_SPRINT_INIT";
export const ADD_SPRINT_SUCCESS = "ADD_SPRINT_SUCCESS";
export const ADD_SPRINT_FAIL = "ADD_SPRINT_FAIL";

export const addSprint = ( sprint: ISprint ) => dispatch => {
    dispatch( { type: ADD_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .add( sprint )
        .then( res => {
            sprint.id = res.id;
            dispatch( {
                type: ADD_SPRINT_SUCCESS, payload: sprint,
            } );
        } )
        .catch( err => {
            dispatch( { type: ADD_SPRINT_FAIL, payload: err } );
        } );
};

export const DELETE_SPRINT_INIT = "DELETE_SPRINT_INIT";
export const DELETE_SPRINT_SUCCESS = "DELETE_SPRINT_SUCCESS";
export const DELETE_SPRINT_FAIL = "DELETE_SPRINT_FAIL";

export const deleteSprint = ( sprint: ISprint ) => dispatch => {
    
    dispatch( { type: DELETE_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .doc( sprint.id ).delete()
        .then( res => {
            console.log( res );
            dispatch( {
                type: DELETE_SPRINT_SUCCESS, sprint,
            } );
        } )
        .catch( err => {
            dispatch( { type: DELETE_SPRINT_FAIL, payload: err } );
        } );
};

export const UPDATE_SPRINT_INIT = "UPDATE_SPRINT_INIT";
export const UPDATE_SPRINT_SUCCESS = "UPDATE_SPRINT_SUCCESS";
export const UPDATE_SPRINT_FAIL = "UPDATE_SPRINT_FAIL";

export const updateSprint = ( sprint: ISprint ) => dispatch => {
    
    dispatch( { type: UPDATE_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .doc( sprint.id ).set( sprint )
        .then( res => {
            console.log( res );
            dispatch( {
                type: UPDATE_SPRINT_SUCCESS, sprint,
            } );
        } )
        .catch( err => {
            dispatch( { type: UPDATE_SPRINT_FAIL, payload: err } );
        } );
};

export const GET_SPRINT_INIT = "GET_SPRINT_INIT";
export const GET_SPRINT_SUCCESS = "GET_SPRINT_SUCCESS";
export const GET_SPRINT_FAIL = "GET_SPRINT_FAIL";

export const subscribeToSprints = () => dispatch => {
    dispatch( { type: GET_SPRINT_INIT } );
    dispatch( { type: GET_COURSES_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .onSnapshot( snapshot => {
            
            let courses = {};
            if ( !snapshot.empty ) {
                snapshot.docs.forEach( course => {
                    let courseData = course.data();
                    courseData.id = course.id;
                    // @ts-ignore
                    courses[ courseData.id ] = courseData;
                    
                    return store.collection( "autoFill" )
                        .doc( "web" )
                        .collection( "courses" )
                        .doc( course.id )
                        .collection( "sprints" )
                        .onSnapshot( snapshot => {
                            if ( !snapshot.empty ) {
                                let sprintsFromDb = {};
                                snapshot.docs.forEach( sprint => {
                                    
                                    let sprintData = sprint.data();
                                    sprintData.id = sprint.id;
                                    sprintData.course = courseData.id;
                                    sprintsFromDb[ sprint.id ] = sprintData;
                                    getLessons( sprintData )( dispatch );
                                } );
                                dispatch( {
                                    type: GET_SPRINT_SUCCESS,
                                    payload: sprintsFromDb
                                } );
                            } else {
                                dispatch( action( GET_SPRINT_FAIL,
                                    {
                                        id: course.id, message: "Empty Sprints"
                                    } )
                                )
                            }
                            
                        }, err => dispatch(
                            action( GET_SPRINT_FAIL,
                                { id: course.id, message: err.message } ) ) );
                    
                } );
            }
            
            dispatch( { type: GET_COURSES_SUCCESS, payload: courses } );
        }, error => {
            dispatch( { type: GET_SPRINT_FAIL, payload: error } );
            console.log( error );
        } );
};

export const GET_LESSONS_INIT = "GET_LESSONS_INIT";
export const GET_LESSONS_SUCCESS = "GET_LESSONS_SUCCESS";
export const GET_LESSONS_FAIL = "GET_LESSONS_FAIL";

export const getLessons = ( sprint ) => dispatch => {
    
    dispatch( { type: GET_LESSONS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .doc( sprint.id )
        .collection( "lessons" )
        .get()
        .then( res => {
            let lessonsObject = {};
            // @ts-ignore
            lessonsObject.lessons = {};
            if ( !res.empty ) {
                res.docs.forEach( lesson => {
                    
                    let lessonData = lesson.data();
                    lessonData.id = lesson.id;
                    lessonData.sprint = sprint.id;
                    lessonData.course = sprint.course;
                    // @ts-ignore
                    lessonsObject.lessons[ lesson.id ] = lessonData;
                } );
                
            }
            // @ts-ignore
            lessonsObject.sprintId = sprint.id;
            dispatch( {
                type: GET_LESSONS_SUCCESS, payload: lessonsObject,
            } );
        } )
        .catch( err => {
            dispatch( { type: GET_LESSONS_FAIL, payload: err } );
        } );
};

export const ADD_LESSON_INIT = "ADD_LESSON_INIT";
export const ADD_LESSON_SUCCESS = "ADD_LESSON_SUCCESS";
export const ADD_LESSON_FAIL = "ADD_LESSON_FAIL";

export const addLesson = ( sprint: ISprint, lesson: ILesson ) => dispatch => {
    
    lesson.sprint = sprint.id;
    lesson.course = sprint.course;
    dispatch( { type: ADD_LESSON_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .doc( sprint.id )
        .collection( "lessons" )
        .add( lesson )
        .then( res => {
            console.log( res );
            lesson.id = res.id;
            dispatch( {
                type: ADD_LESSON_SUCCESS, payload: lesson,
            } );
        } )
        .catch( err => {
            dispatch( { type: ADD_LESSON_FAIL, payload: err } );
        } );
};

export const EDIT_LESSON_INIT = "EDIT_LESSON_INIT";
export const EDIT_LESSON_SUCCESS = "EDIT_LESSON_SUCCESS";
export const EDIT_LESSON_FAIL = "EDIT_LESSON_FAIL";

export const editLesson = ( sprint: ISprint, lesson: ILesson ) => dispatch => {
    
    lesson.sprint = sprint.id;
    lesson.course = sprint.course;
    dispatch( { type: EDIT_LESSON_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( sprint.course )
        .collection( "sprints" )
        .doc( sprint.id )
        .collection( "lessons" )
        .doc( lesson.id )
        .set( lesson )
        .then( res => {
            console.log( res );
            dispatch( {
                type: EDIT_LESSON_SUCCESS, payload: lesson,
            } );
        } )
        .catch( err => {
            dispatch( { type: EDIT_LESSON_FAIL, payload: err } );
        } );
};

export const DEL_LESSON_INIT = "DEL_LESSON_INIT";
export const DEL_LESSON_SUCCESS = "DEL_LESSON_SUCCESS";
export const DEL_LESSON_FAIL = "DEL_LESSON_FAIL";

export const deleteLesson = ( sprint: ISprint, lesson: ILesson ) =>
    dispatch => {
        
        lesson.sprint = sprint.id;
        lesson.course = sprint.course;
        dispatch( { type: DEL_LESSON_INIT } );
        store.collection( "autoFill" )
            .doc( "web" )
            .collection( "courses" )
            .doc( sprint.course )
            .collection( "sprints" )
            .doc( sprint.id )
            .collection( "lessons" )
            .doc( lesson.id )
            .delete()
            .then( res => {
                console.log( res );
                dispatch( action( DEL_LESSON_SUCCESS, lesson ) );
            } )
            .catch( err => {
                dispatch( action( DEL_LESSON_FAIL, err ) );
            } );
    };

export const CHANGE_SELECTED_SPRINT = "CHANGE_SELECTED_SPRINT";

export const changeSelectedSprint = ( sprint: ISprint ) => dispatch => {
    if ( sprint !== null ) {
        getLessons( sprint )( dispatch );
    }
    dispatch( action( CHANGE_SELECTED_SPRINT, sprint ) );
};