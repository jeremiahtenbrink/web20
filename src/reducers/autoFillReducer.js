import {
    GET_INSTRUCTORS_FAIL, GET_INSTRUCTORS_INIT, GET_INSTRUCTORS_SUCCESS,
    UPDATE_INSTRUCTORS_INIT, UPDATE_INSTRUCTORS_SUCCESS,
    UPDATE_INSTRUCTORS_FAIL, DELETE_INSTRUCTORS_INIT, ADD_INSTRUCTORS_INIT,
    ADD_INSTRUCTORS_SUCCESS, ADD_INSTRUCTORS_FAIL, DELETE_INSTRUCTORS_SUCCESS,
    DELETE_INSTRUCTORS_FAIL, GET_SECTIONS_FAIL, GET_SECTIONS_INIT,
    GET_SECTIONS_SUCCESS, GET_TAS_INIT, GET_TAS_SUCCESS, GET_TAS_FAIL
} from "../actions";

const initialState = {
    gettingSections: false,
    gettingInstructors: false,
    gettingTas: false,
    updatingInstructor: false,
    deletingInstructor: false,
    addingInstructor: false,
    tas: [],
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
        case UPDATE_INSTRUCTORS_INIT:
            return { ...state, updatingInstructor: true };
        case UPDATE_INSTRUCTORS_SUCCESS:
            
            const instructorsUpdated = state.instructors.map( instructor => {
                if( instructor.id === action.payload.id ){
                    return action.payload;
                }else{
                    return instructor;
                }
            } );
            
            return {
                ...state,
                instructors: instructorsUpdated,
                updatingInstructor: false,
            };
        case UPDATE_INSTRUCTORS_FAIL:
            return {
                ...state, updatingInstructor: false, error: action.payload,
            };
        case DELETE_INSTRUCTORS_INIT:
            return { ...state, deletingInstructor: true };
        case DELETE_INSTRUCTORS_SUCCESS:
            debugger;
            const instructorsAfterDelete = state.instructors.filter(
                instructor => instructor.id !== action.payload.id );
            
            return {
                ...state,
                instructors: [ ...instructorsAfterDelete ],
                deletingInstructor: false,
            };
        case DELETE_INSTRUCTORS_FAIL:
            return {
                ...state, deletingInstructor: false, error: action.payload,
            };
        case ADD_INSTRUCTORS_INIT:
            return { ...state, addingInstructor: true };
        case ADD_INSTRUCTORS_SUCCESS:
            return {
                ...state,
                instructors: [ ...state.instructors, action.payload ],
                addingInstructor: false,
            };
        case ADD_INSTRUCTORS_FAIL:
            return {
                ...state, addingInstructor: false, error: action.payload,
            };
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
        
        default:
            return state;
    }
};
