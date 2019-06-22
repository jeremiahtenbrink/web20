import {
    GET_INSTRUCTORS_FAIL, GET_INSTRUCTORS_INIT, GET_INSTRUCTORS_SUCCESS,
    UPDATE_INSTRUCTORS_INIT, UPDATE_INSTRUCTORS_SUCCESS,
    UPDATE_INSTRUCTORS_FAIL, DELETE_INSTRUCTORS_INIT, ADD_INSTRUCTORS_INIT,
    ADD_INSTRUCTORS_SUCCESS, ADD_INSTRUCTORS_FAIL, DELETE_INSTRUCTORS_SUCCESS,
    DELETE_INSTRUCTORS_FAIL, GET_TAS_INIT, GET_TAS_SUCCESS, GET_TAS_FAIL,
    ADD_TAS_INIT, ADD_TAS_SUCCESS, ADD_TAS_FAIL, DELETE_TAS_INIT,
    DELETE_TAS_SUCCESS, DELETE_TAS_FAIL, UPDATE_TAS_INIT, UPDATE_TAS_FAIL,
    UPDATE_TAS_SUCCESS, GET_COURSES_FAIL, GET_COURSES_INIT, GET_COURSES_SUCCESS,
    DEL_COURSE_FAIL, DEL_COURSE_INIT, DEL_COURSE_SUCCESS, ADD_COURSE_FAIL,
    ADD_COURSE_INIT, ADD_COURSE_SUCCESS, GET_PMS_FAIL, GET_PMS_INIT,
    GET_PMS_SUCCESS
} from "../actions";
import { IAutoFillReducer } from "../types/AutoFillReducerInterface";
import { IAction } from "../types/ActionInterface";

const initialState: IAutoFillReducer = {
    gettingSections: false,
    gettingInstructors: false,
    gettingTas: false,
    gettingPms: false,
    updatingInstructor: false,
    deletingInstructor: false,
    addingInstructor: false,
    updatingLesson: false,
    deletingLesson: false,
    deletingSection: false,
    addingSprint: false,
    addingLesson: false,
    addingTA: false,
    updatingTA: false,
    deletingTA: false,
    gettingCourses: false,
    addingCourse: false,
    deletingCourse: false,
    tas: {},
    instructors: {},
    courses: {},
    pms: {},
    error: "",
};

export const autoFillReducer = ( state: IAutoFillReducer = initialState,
                                 action: IAction ): IAutoFillReducer => {
    switch ( action.type ) {
        
        
        // GETTING INSTRUCTORS ------------------------------------------
        
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
        
        // UPDATING INSTRUCTORS ------------------------------------------
        case UPDATE_INSTRUCTORS_INIT:
            return { ...state, updatingInstructor: true };
        case UPDATE_INSTRUCTORS_SUCCESS:
            return {
                ...state, updatingInstructor: false
            };
        case UPDATE_INSTRUCTORS_FAIL:
            return {
                ...state, updatingInstructor: false, error: action.payload,
            };
        
        // DELETING INSTRUCTORS ------------------------------------------
        
        case DELETE_INSTRUCTORS_INIT:
            return { ...state, deletingInstructor: true };
        case DELETE_INSTRUCTORS_SUCCESS:
            return {
                ...state, deletingInstructor: false,
            };
        case DELETE_INSTRUCTORS_FAIL:
            return {
                ...state, deletingInstructor: false, error: action.payload,
            };
        
        // ADD INSTRUCTORS ------------------------------------------
        
        case ADD_INSTRUCTORS_INIT:
            return { ...state, addingInstructor: true };
        case ADD_INSTRUCTORS_SUCCESS:
            return {
                ...state, addingInstructor: false,
            };
        case ADD_INSTRUCTORS_FAIL:
            return {
                ...state, addingInstructor: false, error: action.payload,
            };
        
        // GETTING TAS ------------------------------------------
        
        case GET_TAS_INIT:
            return {
                ...state, gettingTas: true
            };
        case GET_TAS_SUCCESS:
            return {
                ...state, gettingTas: false, tas: action.payload
            };
        case GET_TAS_FAIL:
            return {
                ...state, gettingTas: false, error: action.payload,
            };
        
        // ADDING TAS ------------------------------------------
        
        case ADD_TAS_INIT:
            return {
                ...state, addingTA: true
            };
        case ADD_TAS_SUCCESS:
            return {
                ...state, addingTA: false
            };
        case ADD_TAS_FAIL:
            return {
                ...state, addingTA: false, error: action.payload,
            };
        
        // UPDATING TAS ------------------------------------------
        
        case UPDATE_TAS_INIT:
            return {
                ...state, updatingTA: true
            };
        case UPDATE_TAS_SUCCESS:
            return {
                ...state, updatingTA: false
            };
        case UPDATE_TAS_FAIL:
            return {
                ...state, updatingTA: false, error: action.payload,
            };
        
        
        // DELETING TAS ------------------------------------------
        
        case DELETE_TAS_INIT:
            return {
                ...state, deletingTA: true
            };
        case DELETE_TAS_SUCCESS:
            return {
                ...state, deletingTA: false
            };
        case DELETE_TAS_FAIL:
            return {
                ...state, deletingTA: false, error: action.payload,
            };
        
        // GETTING COURSES ------------------------------------------
        
        case GET_COURSES_INIT:
            return {
                ...state, gettingCourses: true
            };
        case GET_COURSES_SUCCESS:
            console.log( "setting courses into reducer", action.payload );
            
            return {
                ...state, gettingCourses: false, courses: action.payload
            };
        case GET_COURSES_FAIL:
            console.log( "setting get course fail in reducer" );
            return {
                ...state,
                gettingCourses: false,
                courses: {},
                error: action.payload,
            };
        
        // ADDING COURSE ------------------------------------------
        
        case ADD_COURSE_INIT:
            return {
                ...state, addingCourse: true
            };
        case ADD_COURSE_SUCCESS:
            return {
                ...state, addingCourse: false,
            };
        case ADD_COURSE_FAIL:
            return {
                ...state, addingCourse: false, error: action.payload,
            };
        
        // DELETE COURSE ------------------------------------------
        
        case DEL_COURSE_INIT:
            return {
                ...state, deletingCourse: true
            };
        case DEL_COURSE_SUCCESS:
            return {
                ...state, deletingCourse: false,
            };
        case DEL_COURSE_FAIL:
            return {
                ...state, deletingCourse: false, error: action.payload,
            };
        
        // GET PMS ------------------------------------------
        
        case GET_PMS_INIT:
            return {
                ...state, gettingPms: true
            };
        case GET_PMS_SUCCESS:
            
            return {
                ...state, gettingPms: false, pms: action.payload,
            };
        case GET_PMS_FAIL:
            return {
                ...state, gettingPms: false, pms: {}, error: action.payload,
            };
        
        default:
            return state;
    }
};
