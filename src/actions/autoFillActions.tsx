import { store } from "../firebase/firebase";
import { action } from "./action";
import { subscribe, unsubscribe } from "./subscribe";
import { IInstructor } from "../types/InstructorInterface";
import { ITa } from "../types/TASInterface";
import { ICourse } from "../types/CourseInterface";

export const UPDATE_INSTRUCTORS_INIT = "UPDATE_INSTRUCTORS_INIT";
export const UPDATE_INSTRUCTORS_SUCCESS = "UPDATE_INSTRUCTORS_SUCCESS";
export const UPDATE_INSTRUCTORS_FAIL = "UPDATE_INSTRUCTORS_FAIL";

export const updateInstructor = ( instructor: IInstructor ) => dispatch => {
    
    dispatch( { type: UPDATE_INSTRUCTORS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" ).doc( instructor.id )
        .update( instructor )
        .then( res => {
            console.log( res );
            dispatch( action( UPDATE_INSTRUCTORS_SUCCESS ) );
        } )
        .catch( err => {
            dispatch( action( UPDATE_INSTRUCTORS_FAIL, err.message ) );
        } );
};

export const DELETE_INSTRUCTORS_INIT = "DELETE_INSTRUCTORS_INIT";
export const DELETE_INSTRUCTORS_SUCCESS = "DELETE_INSTRUCTORS_SUCCESS";
export const DELETE_INSTRUCTORS_FAIL = "DELETE_INSTRUCTORS_FAIL";

export const deleteInstructor = ( instructor: IInstructor ) => dispatch => {
    
    dispatch( action( DELETE_INSTRUCTORS_INIT ) );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" ).doc( instructor.id )
        .delete()
        .then( res => {
            console.log( res );
            dispatch( action( DELETE_INSTRUCTORS_SUCCESS ) );
            
        } ).catch( err => {
        dispatch( action( DELETE_INSTRUCTORS_FAIL, err ) );
    } );
};

export const GET_INSTRUCTORS_INIT = "GET_INSTRUCTORS_INIT";
export const GET_INSTRUCTORS_SUCCESS = "GET_INSTRUCTORS_SUCCESS";
export const GET_INSTRUCTORS_FAIL = "GET_INSTRUCTORS_FAIL";

export const subscribeToInstructors = () => ( dispatch ): Function => {
    dispatch( { type: GET_INSTRUCTORS_INIT } );
    return store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" )
        .orderBy( "name", "asc" )
        .onSnapshot( snapshot => {
            
            let instructors = {};
            snapshot.forEach( instructor => {
                const data = instructor.data();
                data.id = instructor.id;
                instructors[ data.id ] = data;
            } );
            
            dispatch( {
                type: GET_INSTRUCTORS_SUCCESS, payload: instructors,
            } );
            
        }, err => {
            console.log( err );
            dispatch( { type: GET_INSTRUCTORS_FAIL, payload: err } );
        } );
};

export const ADD_INSTRUCTORS_INIT = "ADD_INSTRUCTORS_INIT";
export const ADD_INSTRUCTORS_SUCCESS = "ADD_INSTRUCTORS_SUCCESS";
export const ADD_INSTRUCTORS_FAIL = "ADD_INSTRUCTORS_FAIL";

export const addInstructor = ( instructor: IInstructor ) => dispatch => {
    dispatch( { type: ADD_INSTRUCTORS_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "instructors" )
        .add( instructor )
        .then( res => {
            console.log( res );
            dispatch( ADD_INSTRUCTORS_SUCCESS );
        } )
        .catch( err => {
            dispatch( { type: ADD_INSTRUCTORS_FAIL, payload: err } );
        } );
};

export const GET_TAS_INIT = "GET_TAS_INIT";
export const GET_TAS_SUCCESS = "GET_TAS_SUCCESS";
export const GET_TAS_FAIL = "GET_TAS_FAIL";

export const subscribeToTas = () => ( dispatch ): Function => {
    
    dispatch( { type: GET_TAS_INIT } );
    return store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" )
        .onSnapshot( snapshot => {
            let tasObject = {};
            snapshot.forEach( ta => {
                const data = ta.data();
                data.id = ta.id;
                tasObject[ data.id ] = data;
            } );
            dispatch( {
                type: GET_TAS_SUCCESS, payload: tasObject,
            } );
        }, err => {
            dispatch( { type: GET_TAS_FAIL, payload: err.message } );
        } );
    
};

export const UPDATE_TAS_INIT = "UPDATE_TAS_INIT";
export const UPDATE_TAS_SUCCESS = "UPDATE_TAS_SUCCESS";
export const UPDATE_TAS_FAIL = "UPDATE_TAS_FAIL";

export const updateTa = ( ta: ITa ) => dispatch => {
    
    dispatch( action( UPDATE_TAS_INIT ) );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" ).doc( ta.id )
        .update( ta )
        .then( res => {
            dispatch( action( UPDATE_TAS_SUCCESS, ) );
        } )
        .catch( err => {
            dispatch( action( UPDATE_TAS_FAIL, err ) );
        } );
};

export const DELETE_TAS_INIT = " DELETE_TAS_INIT";
export const DELETE_TAS_SUCCESS = " DELETE_TAS_SUCCESS";
export const DELETE_TAS_FAIL = " DELETE_TAS_FAIL";

export const deleteTa = ( ta: ITa ) => dispatch => {
    
    dispatch( action( DELETE_TAS_INIT ) );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" ).doc( ta.id )
        .delete()
        .then( res => {
            dispatch( action( DELETE_TAS_SUCCESS ) );
        } )
        .catch( err => {
            dispatch( action( DELETE_TAS_FAIL, err ) );
        } );
};

export const ADD_TAS_INIT = " ADD_TAS_INIT";
export const ADD_TAS_SUCCESS = " ADD_TAS_SUCCESS";
export const ADD_TAS_FAIL = " ADD_TAS_FAIL";

export const addTa = ( ta: ITa ) => dispatch => {
    
    dispatch( action( ADD_TAS_INIT ) );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "tas" )
        .add( ta )
        .then( res => {
            ta.id = res.id;
            dispatch( action( ADD_TAS_SUCCESS ) );
        } )
        .catch( err => {
            dispatch( action( ADD_TAS_FAIL, err ) );
        } );
};

export const ADD_COURSE_INIT = " ADD_COURSE_INIT";
export const ADD_COURSE_SUCCESS = " ADD_COURSE_SUCCESS";
export const ADD_COURSE_FAIL = " ADD_COURSE_FAIL";

export const addCourse = ( course: ICourse ) => dispatch => {
    
    dispatch( { type: ADD_COURSE_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" ).doc( course.id )
        .set( course )
        .then( res => {
            dispatch( action( ADD_COURSE_SUCCESS ) );
        } )
        .catch( err => {
            dispatch( action( ADD_COURSE_FAIL, err ) );
        } );
};

export const GET_COURSES_INIT = " GET_COURSES_INIT";
export const GET_COURSES_SUCCESS = " GET_COURSES_SUCCESS";
export const GET_COURSES_FAIL = " GET_COURSES_FAIL";

export const subscribeToCourses = () => ( dispatch ): Function => {
    console.log( "Subscribing to courses" );
    dispatch( { type: GET_COURSES_INIT } );
    return store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .onSnapshot( snapshot => {
            let courses = {};
            snapshot.docs.forEach( course => {
                let courseData = course.data();
                courseData.id = course.id;
                courses[ courseData.id ] = courseData;
            } );
            dispatch( action( GET_COURSES_SUCCESS, courses ) );
        }, err => {
            dispatch( action( GET_COURSES_FAIL, err ) );
        } );
    
};

export const DEL_COURSE_INIT = " DEL_COURSE_INIT";
export const DEL_COURSE_SUCCESS = " DEL_COURSE_SUCCESS";
export const DEL_COURSE_FAIL = " DEL_COURSE_FAIL";

export const delCourses = ( course: ICourse ) => dispatch => {
    
    dispatch( { type: DEL_COURSE_INIT } );
    store.collection( "autoFill" )
        .doc( "web" )
        .collection( "courses" )
        .doc( course.id )
        .delete()
        .then( res => {
            dispatch( action( DEL_COURSE_SUCCESS ) );
        } )
        .catch( err => {
            dispatch( action( DEL_COURSE_FAIL, err ) );
        } );
};

export const GET_PMS_INIT = " GET_PMS_INIT";
export const GET_PMS_SUCCESS = " GET_PMS_SUCCESS";
export const GET_PMS_FAIL = " GET_PMS_FAIL";

export const subscribeToPms = () => ( dispatch ) => {
    dispatch( action( GET_PMS_INIT ) );
    store.collection( "users" )
        .get()
        .then( res => {
            let pms = {};
            res.docs.forEach( pm => {
                let pmData = pm.data();
                pmData.id = pm.id;
                pms[ pmData.id ] = pmData;
            } );
            dispatch( action( GET_PMS_SUCCESS, pms ) );
        } )
        .catch( err => {
            dispatch( action( GET_PMS_FAIL, err ) );
        } );
};
