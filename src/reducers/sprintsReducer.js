import {
    ADD_SPRINT_INIT, ADD_SPRINT_FAIL, ADD_SPRINT_SUCCESS, UPDATE_SPRINT_INIT,
    UPDATE_SPRINT_FAIL, UPDATE_SPRINT_SUCCESS, DELETE_SPRINT_INIT,
    DELETE_SPRINT_SUCCESS, DELETE_SPRINT_FAIL, GET_SPRINT_INIT,
    GET_SPRINT_SUCCESS, GET_SPRINT_FAIL, GET_LESSONS_INIT, GET_LESSONS_SUCCESS,
    GET_LESSONS_FAIL, ADD_LESSON_INIT, ADD_LESSON_SUCCESS, ADD_LESSON_FAIL,
    CHANGE_SELECTED_SPRINT,
} from "../actions";

const initialState = {
    addingSprint: false,
    deletingSprint: false,
    updatingSprint: false,
    gettingSprints: false,
    gettingLessons: false,
    updatingLessons: false,
    lessonsLoaded: false,
    addingLesson: false,
    selectedSprint: null,
    selectedLessons: [],
    lessons: {},
    sprints: [],
    error: "",
};

export const sprintsReducer = ( state = initialState, action ) => {
    switch( action.type ){
        
        //SPRINTS CHANGE SELECTED SPRINT -------------------------------------
        
        case CHANGE_SELECTED_SPRINT:
            return { ...state, selectedSprint: action.payload };
        
        //SPRINTS GET ---------------------------------------------------
        
        case GET_SPRINT_INIT:
            return { ...state, gettingSprints: true };
        case GET_SPRINT_SUCCESS:
            return { ...state, gettingSprints: false, sprints: action.payload };
        case GET_SPRINT_FAIL:
            return { ...state, gettingSprints: false, err: action.payload };
        
        //SPRINTS ADD -----------------------------------------------
        
        case ADD_SPRINT_INIT:
            return { ...state, addingSprint: true };
        case ADD_SPRINT_SUCCESS:
            
            return {
                ...state,
                addingSprint: false,
                sprints: [ ...state.sprints, action.payload ]
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
                sprints: [ ...state.sprints, action.payload ]
            };
        case UPDATE_SPRINT_FAIL:
            return { ...state, updatingSprint: false, error: action.payload };
        
        //SPRINTS DELETE -------------------------------------------------------
        
        case DELETE_SPRINT_INIT:
            return { ...state, deletingSprint: true };
        case DELETE_SPRINT_SUCCESS:
            let sprints = state.sprints.filter(
                sprint => sprint.name !== action.payload );
            return {
                ...state, deletingSprint: false, sprints
            };
        case DELETE_SPRINT_FAIL:
            return { ...state, deletingSprint: false, error: action.payload };
        
        //LESSONS GET ---------------------------------------------------------
        
        case GET_LESSONS_INIT:
            return { ...state, gettingLessons: true, lessonsLoaded: false };
        case GET_LESSONS_SUCCESS:
            
            if( !action.payload.sprintId ){
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
            if( state.selectedSprint.id === action.payload.sprint ){
                return {
                    ...state, addingLesson: false, selectedLessons: [
                        ...state.selectedLessons, action.payload
                    ]
                };
            }else{
                return { ...state, addingLesson: false };
            }
        case ADD_LESSON_FAIL:
            return { ...state, gettingLessons: false, error: action.payload };
        
        
        //DEFAULT ------------------------------------------------------------
        
        default:
            return state;
    }
};
