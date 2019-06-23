import {
    ADD_SPRINT_INIT, ADD_SPRINT_FAIL, ADD_SPRINT_SUCCESS, UPDATE_SPRINT_INIT,
    UPDATE_SPRINT_FAIL, UPDATE_SPRINT_SUCCESS, DELETE_SPRINT_INIT,
    DELETE_SPRINT_SUCCESS, DELETE_SPRINT_FAIL, GET_SPRINT_INIT,
    GET_SPRINT_SUCCESS, GET_SPRINT_FAIL, GET_LESSONS_INIT, GET_LESSONS_SUCCESS,
    GET_LESSONS_FAIL, ADD_LESSON_INIT, ADD_LESSON_SUCCESS, ADD_LESSON_FAIL,
    CHANGE_SELECTED_SPRINT, EDIT_LESSON_INIT, EDIT_LESSON_SUCCESS,
    EDIT_LESSON_FAIL, DEL_LESSON_FAIL, DEL_LESSON_INIT, DEL_LESSON_SUCCESS
} from "../actions";
import { ISprintsReducer } from "../types/SprintsReducerInterface";
import Logger from '../utils/logger';

const initialState: ISprintsReducer = {
    addingSprint: false,
    deletingSprint: false,
    updatingSprint: false,
    gettingSprints: false,
    gettingLessons: false,
    updatingLessons: false,
    editingLesson: false,
    lessonsLoaded: false,
    addingLesson: false,
    deletingLesson: false,
    selectedSprint: null,
    selectedLessons: [],
    lessons: {},
    sprints: {},
    error: "",
};

export const sprintsReducer = ( state = initialState,
                                action ): ISprintsReducer => {
    
    switch ( action.type ) {
        
        //SPRINTS CHANGE SELECTED SPRINT -------------------------------------
        
        case CHANGE_SELECTED_SPRINT:
            return { ...state, selectedSprint: action.payload };
        
        //SPRINTS GET ---------------------------------------------------
        
        case GET_SPRINT_INIT:
            return { ...state, gettingSprints: true, sprints: {} };
        case GET_SPRINT_SUCCESS:
            Logger( "adding sprints", action.payload, 'info', 'SprintsReducer',
                'Sprints' );
            return {
                ...state,
                gettingSprints: false,
                sprints: { ...state.sprints, ...action.payload }
            };
        case GET_SPRINT_FAIL:
            
            let keys = Object.keys( state.sprints );
            for ( let i = 0; i < keys.length; i++ ) {
                let sprint = state.sprints[ keys[ i ] ];
                if ( sprint.course === action.payload.id ) {
                    delete state.sprints[ keys[ i ] ];
                }
            }
            return {
                ...state, gettingSprints: false, error: action.payload.message,
                sprints: { ...state.sprints }
            };
        
        //SPRINTS ADD -----------------------------------------------
        
        case ADD_SPRINT_INIT:
            return { ...state, addingSprint: true };
        case ADD_SPRINT_SUCCESS:
            
            return {
                ...state,
                addingSprint: false,
            };
        case ADD_SPRINT_FAIL:
            return { ...state, addingSprint: false, error: action.payload };
        
        //SPRINTS UPDATE -------------------------------------------------
        
        case UPDATE_SPRINT_INIT:
            return { ...state, updatingSprint: true };
        case UPDATE_SPRINT_SUCCESS:
            return {
                ...state,
                updatingSprint: false,
            };
        case UPDATE_SPRINT_FAIL:
            return { ...state, updatingSprint: false, error: action.payload };
        
        //SPRINTS DELETE -------------------------------------------------------
        
        case DELETE_SPRINT_INIT:
            return { ...state, deletingSprint: true };
        case DELETE_SPRINT_SUCCESS:
            return {
                ...state, deletingSprint: false,
            };
        case DELETE_SPRINT_FAIL:
            return { ...state, deletingSprint: false, error: action.payload };
        
        //LESSONS GET ---------------------------------------------------------
        
        case GET_LESSONS_INIT:
            return { ...state, gettingLessons: true, lessonsLoaded: false };
        case GET_LESSONS_SUCCESS:
            
            if ( !action.payload.sprintId ) {
                return {
                    ...state, gettingLessons: false, lessonsLoaded: true,
                };
            }
            let lessons = state.lessons;
            lessons[ action.payload.sprintId ] = action.payload.lessons;
            return {
                ...state,
                gettingLessons: false,
                lessonsLoaded: true,
                selectedLessons: action.payload,
                lessons: { ...lessons },
            };
        case GET_LESSONS_FAIL:
            return {
                ...state,
                gettingLessons: false,
                error: action.payload,
                lessonsLoaded: false
            };
        
        //LESSONS ADD ---------------------------------------------------------
        
        case ADD_LESSON_INIT:
            return { ...state, addingLesson: true };
        case ADD_LESSON_SUCCESS:
            
            let lessonsToAddTo = state.lessons;
            lessonsToAddTo[ action.payload.sprint ][ action.payload.id ] =
                action.payload;
            if ( state.selectedSprint.id === action.payload.sprint ) {
                return {
                    ...state, addingLesson: false, selectedLessons: [
                        ...state.selectedLessons, action.payload
                    ], lessons: { ...lessonsToAddTo }
                };
            } else {
                return {
                    ...state,
                    addingLesson: false,
                    lessons: { ...lessonsToAddTo }
                };
            }
        case ADD_LESSON_FAIL:
            return { ...state, gettingLessons: false, error: action.payload };
        
        
        //LESSONS EDIT ---------------------------------------------------------
        
        case DEL_LESSON_INIT:
            return { ...state, deletingLesson: true };
        case DEL_LESSON_SUCCESS:
            
            delete state.lessons[ action.payload.sprint ][ action.payload.id ];
            return {
                ...state,
                deletingLesson: false,
                lessons: { ...state.lessons },
                error: ""
            };
        case DEL_LESSON_FAIL:
            return { ...state, deletingLesson: false, error: action.payload };
        
        //LESSON DELETE
        // ---------------------------------------------------------
        
        case EDIT_LESSON_INIT:
            return { ...state, editingLesson: true };
        case EDIT_LESSON_SUCCESS:
            
            state.lessons[ action.payload.sprint ][ action.payload.id ] =
                { ...action.payload };
            return {
                ...state,
                editingLesson: false,
                lessons: { ...state.lessons },
                error: ""
            };
        case EDIT_LESSON_FAIL:
            return { ...state, editingLesson: false, error: action.payload };
        
        
        //DEFAULT ------------------------------------------------------------
        
        default:
            return state;
    }
};

