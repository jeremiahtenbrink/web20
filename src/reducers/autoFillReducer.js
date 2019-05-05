import {
    GET_INSTRUCTORS_FAIL, GET_INSTRUCTORS_INIT, GET_INSTRUCTORS_SUCCESS,
    GET_SECTIONS_FAIL, GET_SECTIONS_INIT, GET_SECTIONS_SUCCESS,
} from "../actions";

const initialState = {
    gettingSections: false,
    gettingInstructors: false,
    lessons: [],
    sprints: [],
    instructors: [],
    error: "",
};

export const autoFillReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case GET_SECTIONS_INIT:
            return { ...state, gettingSections: true };
        case GET_SECTIONS_SUCCESS:
            return {
                ...state,
                lessons: action.payload.lessons,
                sprints: action.payload.sprints,
                gettingSections: false,
            };
        case GET_SECTIONS_FAIL:
            return { ...state, gettingSections: false, error: action.payload };
        case GET_INSTRUCTORS_INIT:
            return { ...state, gettingInstructors: true };
        case GET_INSTRUCTORS_SUCCESS:
            return {
                ...state,
                instructors: action.payload,
                gettingInstructors: false,
            };
        case GET_INSTRUCTORS_FAIL:
            return {
                ...state, gettingInstructors: false, error: action.payload,
            };
        
        default:
            return state;
    }
};
