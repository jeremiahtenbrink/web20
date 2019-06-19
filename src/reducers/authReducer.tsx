import {
    SIGNIN_INIT, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNIN_NEW_USER,
    CREATE_USER_INIT, CREATE_USER_SUCCESS, CREATE_USER_FAILED, LOGOUT_INIT,
    LOGOUT_SUCCESSFUL, LOGOUT_FAILED, AUTH_INIT, AUTH_SUCCESS, AUTH_FAILED,
    GET_USER_INIT, GET_USER_SUCCESS, GET_USER_FAILED, EDIT_USER_FAIL,
    EDIT_USER_INIT, EDIT_USER_SUCCESS,
} from "../actions";
import { IAuthReducer } from "../types/AuthReducerInterface";
import { IAction } from "../types/ActionInterface";

const initialState: IAuthReducer = {
    isLoading: false,
    gettingUser: false,
    editingUser: false,
    uid: null,
    displayName: null,
    newUser: false,
    token: "",
    error: "",
    user: {}
};

export const authReducer = ( state: IAuthReducer = initialState,
                             action: IAction ): IAuthReducer => {
    debugger;
    switch ( action.type ) {
        case AUTH_INIT:
            return { ...state, isLoading: true };
        case AUTH_FAILED:
            return { ...state, isLoading: false };
        case AUTH_SUCCESS:
            
            return {
                ...state,
                isLoading: false,
                uid: action.payload.uid,
                displayName: action.payload.displayName,
            };
        case SIGNIN_INIT:
            return { ...state, isLoading: true };
        case SIGNIN_NEW_USER:
            
            return {
                ...state, newUser: true, uid: action.payload, isLoading: false,
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                uid: action.payload,
                token: action.token,
            };
        case SIGNIN_FAILED:
            return { ...state, error: action.payload };
        case CREATE_USER_INIT:
            return { ...state, isLoading: true, error: "" };
        case CREATE_USER_SUCCESS:
            return {
                ...state, isLoading: false, error: "", user: action.payload
            };
        case LOGOUT_INIT:
            return { ...state, isLoading: true, error: "" };
        case LOGOUT_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                uid: null,
                newUser: false,
                token: "",
                error: "",
            };
        case LOGOUT_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        case GET_USER_INIT:
            return { ...state, gettingUser: true, error: "" };
        case GET_USER_FAILED:
            return { ...state, gettingUser: false, error: action.payload };
        case GET_USER_SUCCESS:
            return {
                ...state, gettingUser: false, error: "", user: action.payload
            };
        case EDIT_USER_INIT:
            return { ...state, editingUser: true };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                editingUser: false,
                user: action.payload,
            };
        case EDIT_USER_FAIL:
            return { ...state, editingUser: false, error: action.payload };
        default:
            return state;
    }
};
