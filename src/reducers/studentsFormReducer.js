import {
    GET_STUDENTS_INFO_INIT, GET_STUDENTS_INFO_SUCCESS, GET_STUDENTS_INFO_FAILED
} from "../actions/studentFormActions";

const initialState = {
    student: {}, gettingStudentInfo: false, error: ""
};

export const studentFormReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case GET_STUDENTS_INFO_INIT:
            return { ...state, gettingStudentInfo: true };
        case GET_STUDENTS_INFO_SUCCESS:
            return {
                ...state,
                gettingStudentInfo: false,
                student: action.payload
            };
        case GET_STUDENTS_INFO_FAILED:
            return { ...state, gettingStudentInfo: false, error: "" };
        default:
            return state;
    }
};
