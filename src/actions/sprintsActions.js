import { store } from "../firebase/firebase";

export const ADD_SPRINT_INIT = "ADD_SPRINT_INIT";
export const ADD_SPRINT_SUCCESS = "ADD_SPRINT_SUCCESS";
export const ADD_SPRINT_FAIL = "ADD_SPRINT_FAIL";

export const addSprint = sprint => dispatch => {
    dispatch( { type: ADD_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
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

export const deleteSprint = sprint => dispatch => {
    
    dispatch( { type: DELETE_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
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

export const updateSprint = sprint => dispatch => {
    debugger;
    dispatch( { type: UPDATE_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
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

export const getSprints = () => dispatch => {
    
    dispatch( { type: GET_SPRINT_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sprints" )
        .get()
        .then( res => {
            let sprintsFromDb = {};
            res.docs.forEach( sprint => {
                let data = sprint.data();
                data.id = sprint.id;
                sprintsFromDb[ sprint.id ] = data;
                getLessons( data )( dispatch );
            } );
            dispatch( { type: GET_SPRINT_SUCCESS, payload: sprintsFromDb } );
            
        } )
        .catch( err => {
            dispatch( { type: GET_SPRINT_FAIL, payload: err } );
        } );
};

export const GET_LESSONS_INIT = "GET_LESSONS_INIT";
export const GET_LESSONS_SUCCESS = "GET_LESSONS_SUCCESS";
export const GET_LESSONS_FAIL = "GET_LESSONS_FAIL";

export const getLessons = ( sprint ) => dispatch => {
    
    dispatch( { type: GET_LESSONS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sprints" )
        .doc( sprint.id )
        .collection( "lessons" )
        .get()
        .then( res => {
            let lessonsObject = {};
            lessonsObject.lessons = {};
            if( !res.empty ){
                res.docs.forEach( lesson => {
                    
                    let lessonData = lesson.data();
                    lessonData.id = lesson.id;
                    lessonData.sprint = sprint.id;
                    lessonsObject.lessons[ lesson.id ] = lessonData;
                } );
                
            }
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

export const addLesson = ( sprint, lesson ) => dispatch => {
    
    lesson.sprint = sprint.id;
    dispatch( { type: ADD_LESSON_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "sprints" )
        .doc( sprint.id )
        .collection( "lessons" )
        .add( lesson )
        .then( res => {
            console.log( res );
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

export const editLesson = ( sprint, lesson ) => dispatch => {
    debugger;
    lesson.sprint = sprint.id;
    dispatch( { type: EDIT_LESSON_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
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

export const CHANGE_SELECTED_SPRINT = "CHANGE_SELECTED_SPRINT";

export const changeSelectedSprint = sprint => dispatch => {
    if( sprint !== null ){
        getLessons( sprint )( dispatch );
    }
    dispatch( { type: CHANGE_SELECTED_SPRINT, payload: sprint } );
};