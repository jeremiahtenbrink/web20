import { store } from "../firebase/firebase";

export const FETCH_STUDENTS_INIT = "FETCH_STUDENTS_INIT";
export const FETCH_STUDENTS_SUCCESS = "FETCH_STUDENTS_SUCCESS";
export const FETCH_STUDENTS_FAILED = "FETCH_STUDENTS_FAILED";

export const getStudents = id => dispatch => {
    dispatch( { type: FETCH_STUDENTS_INIT } );
    if( id ){
        store.collection( "users" ).
            doc( id ).
            collection( "students" ).
            orderBy( "firstName" ).
            get().
            then( students => {
                let studentData = [];
                students.forEach( student => {
                    studentData[ student.id ] = {
                        id: student.id, ...student.data(),
                    };
                } );
                dispatch( {
                    type: FETCH_STUDENTS_SUCCESS, payload: studentData,
                } );
            } ).
            catch( err => {
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
    store.collection( "users" ).doc( id ).collection( "students" ).add( {
        ...student,
    } ).then( res => {
        dispatch( {
            type: ADD_STUDENT_SUCCESS, payload: { id: res.id, ...student },
        } );
    } );
};

export const DEL_STUDENT_INIT = "DEL_STUDENT_INIT";
export const DEL_STUDENT_SUCCESS = "DEL_STUDENT_SUCCESS";
export const DEL_STUDENT_FAILED = "DEL_STUDENT_FAILED";

export const delStudent = ( studentId, userId ) => dispatch => {
    dispatch( { type: DEL_STUDENT_INIT } );
    store.collection( "users" ).
        doc( userId ).
        collection( "students" ).
        doc( studentId ).
        delete().
        then( res => {
            dispatch( {
                type: DEL_STUDENT_SUCCESS, payload: studentId,
            } );
        } ).
        catch( err => {
            dispatch( { type: DEL_STUDENT_FAILED, payload: err } );
        } );
};

export const EDIT_STUDENT_INIT = "EDIT_STUDENT_INIT";
export const EDIT_STUDENT_SUCCESS = "EDIT_STUDENT_SUCCESS";
export const EDIT_STUDENT_FAILED = "EDIT_STUDENT_FAILED";

export const editStudent = ( student, userId ) => dispatch => {
    
    dispatch( { type: EDIT_STUDENT_INIT } );
    store.collection( "users" ).
        doc( userId ).
        collection( "students" ).
        doc( student.id ).
        update( student ).
        then( () => {
            dispatch( {
                type: EDIT_STUDENT_SUCCESS, payload: student,
            } );
        } ).
        catch( err => {
            dispatch( { type: EDIT_STUDENT_FAILED, payload: err } );
        } );
};
