import firebase, { store } from "../firebase/firebase";

var provider = new firebase.auth.GoogleAuthProvider();

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";

export const auth = () => dispatch => {

};

export const SIGNIN_INIT = "SIGNIN_INIT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_NEW_USER = "SIGNIN_NEW_USER";
export const SIGNIN_FAILED = "SIGNIN_FAILED";

export const signIn = () => dispatch => {
    dispatch( { type: SIGNIN_INIT } );
    firebase
        .auth()
        .signInWithPopup( provider )
        .then( function( result ){
            if( result.additionalUserInfo.isNewUser ){
                dispatch( {
                    type: SIGNIN_NEW_USER,
                    payload: result.user,
                    token: result.credential.accessToken
                } );
            }else{
                dispatch( {
                    type: SIGNIN_SUCCESS,
                    payload: result.user,
                    token: result.credential.accessToken
                } );
            }
        } )
        .catch( function( error ){
            dispatch( { type: SIGNIN_FAILED, payload: error.message } );
        } );
};

export const CREATE_USER_INIT = "CREATE_USER_INIT";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";

export const createUser = user => dispatch => {
    
    dispatch( { type: CREATE_USER_INIT } );
    store
        .collection( `users` )
        .doc( user.uid )
        .set( {
            id: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            cohort: user.webNumber
        } )
        .then( () => dispatch( { type: CREATE_USER_SUCCESS } ) );
};
