import firebase, { store } from "../firebase/firebase";
import { push } from "connected-react-router";
import { IUser } from "../types/UserInterface";
import { action } from "./action";

export const GOOGLE_PROVIDER = "GOOGLE_PROVIDER";
export const GITHUB_PROVIDER = "GITHUB_PROVIDER";

var googleProvider = new firebase.auth.GoogleAuthProvider();

var githubProvider = new firebase.auth.GithubAuthProvider();

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";

export const checkAuth = () => dispatch => {
    
    dispatch( { type: AUTH_INIT } );
    const { currentUser } = firebase.auth();
    
    if ( currentUser ) {
        getUser( currentUser.uid )( dispatch );
        dispatch( {
            type: AUTH_SUCCESS, payload: currentUser,
        } );
    } else {
        dispatch( { type: AUTH_FAILED } );
        dispatch( push( "/start" ) );
    }
};

export const SIGNIN_INIT = "SIGNIN_INIT";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_NEW_USER = "SIGNIN_NEW_USER";
export const SIGNIN_FAILED = "SIGNIN_FAILED";

export const signIn = ( authType: string ) => dispatch => {
    
    dispatch( { type: SIGNIN_INIT } );
    switch ( authType ) {
        case GOOGLE_PROVIDER:
            firebase
                .auth()
                .signInWithPopup( googleProvider )
                .then( function ( result ) {
                        if ( result.additionalUserInfo ) {
                            
                            dispatch( {
                                type: SIGNIN_NEW_USER,
                                payload: result.user.uid,
                                // @ts-ignore
                                token: result.credential.accessToken,
                            } );
                        } else {
                            
                            
                            dispatch( {
                                type: SIGNIN_SUCCESS,
                                payload: result.user.uid,
                                // @ts-ignore
                                token: result.credential.accessToken,
                            } );
                            
                        }
                    }
                )
                .catch( function ( error ) {
                    dispatch( { type: SIGNIN_FAILED, payload: error.message } );
                } );
            return;
        case GITHUB_PROVIDER:
            firebase
                .auth()
                .signInWithPopup( githubProvider )
                .then( function ( result ) {
                    if ( result.additionalUserInfo ) {
                        
                        dispatch( {
                            type: SIGNIN_NEW_USER,
                            payload: result.user.uid,
                            // @ts-ignore
                            token: result.credential.accessToken,
                        } );
                    } else {
                        
                        
                        dispatch( {
                            type: SIGNIN_SUCCESS,
                            payload: result.user.uid,
                            // @ts-ignore
                            token: result.credential.accessToken,
                        } );
                        
                    }
                } )
                .catch( function ( error ) {
                    dispatch( { type: SIGNIN_FAILED, payload: error.message } );
                } );
            return;
        default:
            dispatch( { type: SIGNIN_FAILED } );
    }
};

export const LOGOUT_INIT = "LOGOUT_INIT";
export const LOGOUT_SUCCESSFUL = "LOGOUT_SUCCESSFUL";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const logout = () => dispatch => {
    dispatch( { type: LOGOUT_INIT } );
    firebase
        .auth()
        .signOut()
        .then( () => {
            dispatch( { type: LOGOUT_SUCCESSFUL } );
        } )
        .catch( err => {
            dispatch( { type: LOGOUT_FAILED, payload: err } );
        } );
};

export const CREATE_USER_INIT = "CREATE_USER_INIT";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";

export const createUser = ( user: IUser ) => dispatch => {
    dispatch( { type: CREATE_USER_INIT } );
    store
        .collection( `users` )
        .doc( user.id )
        .set( user )
        .then( () => {
            dispatch( action( CREATE_USER_SUCCESS, user ) );
            dispatch( push( "/" ) );
        } );
};

export const GET_USER_INIT = "GET_USER_INIT";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const getUser = id => dispatch => {
    dispatch( { type: GET_USER_INIT } );
    store
        .collection( `users` )
        .doc( id )
        .get()
        .then( res => {
            
            if ( res.exists ) {
                let data = res.data();
                dispatch( { type: GET_USER_SUCCESS, payload: data } );
                dispatch( push( '/' ) );
            } else {
                dispatch( push( '/start' ) );
            }
            
        } )
        .catch( err => {
            dispatch( { type: GET_USER_FAILED, payload: err } );
        } );
};

export const EDIT_USER_INIT = "EDIT_USER_INIT";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";

export const editUser = user => dispatch => {
    debugger;
    dispatch( { type: EDIT_USER_INIT } );
    store
        .collection( `users` )
        .doc( user.id )
        .update( user )
        .then( () => {
            dispatch( { type: EDIT_USER_SUCCESS, payload: user } );
        } )
        .catch( err => {
            dispatch( { type: EDIT_USER_FAIL, payload: err } );
        } );
};
