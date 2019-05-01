import { store } from "../firebase/firebase";

export const GET_STUDENTS_INFO_INIT = "GET_STUDENTS_INFO_INIT";
export const GET_STUDENTS_INFO_SUCCESS = "GET_STUDENTS_INFO_SUCCESS";
export const GET_STUDENTS_INFO_FAILED = "GET_STUDENTS_INFO_FAILED";

export const getStudentsInfo = id => dispatch => {
    debugger;
    dispatch( { type: GET_STUDENTS_INFO_INIT } );
    
    store.collection( "students" ).
        doc( id ).
        get().
        then( student => {
            console.log( student );
            
        } ).catch( err => {
        dispatch( { type: GET_STUDENTS_INFO_FAILED, payload: err } );
    } );
};