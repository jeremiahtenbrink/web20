import {
    FETCH_STUDENTS_INIT, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_FAILED,
    ADD_STUDENT_INIT, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILED,
    DEL_STUDENT_SUCCESS, DEL_STUDENT_FAILED, DEL_STUDENT_INIT,
    EDIT_STUDENT_INIT, EDIT_STUDENT_SUCCESS, EDIT_STUDENT_FAILED,
    GENERATE_STUDENT_LINK_INIT, GENERATE_STUDENT_LINK_SUCCESS,
    GENERATE_STUDENT_LINK_FAILED
} from "../actions";

const initialState = {
    students: null,
    isLoading: true,
    isAdding: false,
    isEditing: false,
    error: "",
    isDeleting: false,
};

export const studentsReducer = ( state = initialState, action ) => {
    switch( action.type ){
        case ADD_STUDENT_INIT:
            return { ...state, isAdding: true };
        case ADD_STUDENT_SUCCESS:
            return {
                ...state, students: {
                    ...state.students, [ action.payload.id ]: action.payload,
                }, isAdding: false,
            };
        case FETCH_STUDENTS_INIT:
            return { ...state, isLoading: true };
        case FETCH_STUDENTS_SUCCESS:
            return { ...state, isLoading: false, students: action.payload };
        case DEL_STUDENT_INIT:
            return { ...state, isDeleting: true };
        case DEL_STUDENT_SUCCESS:
            let students = state.students;
            delete students[ action.payload ];
            return { ...state, students: { ...students } };
        case DEL_STUDENT_FAILED:
            return { ...state, isDeleting: false, error: action.payload };
        case EDIT_STUDENT_INIT:
            return { ...state, isEditing: true };
        case EDIT_STUDENT_SUCCESS:
            let studentsEdited = { ...state.students };
            studentsEdited[ action.payload.id ] = {
                ...state.students[ action.payload.id ], ...action.payload,
            };
            return { ...state, students: studentsEdited, isEditing: false };
        case EDIT_STUDENT_FAILED:
            return { ...state, isEditing: false, error: action.payload };
        case GENERATE_STUDENT_LINK_INIT:
            return { ...state, isEditing: true };
        case GENERATE_STUDENT_LINK_SUCCESS:
            let student = { ...state.students[ action.payload.id ] };
            student.link = action.payload.link;
            let newLinkStudents = { ...state.students, ...student };
            return { ...state, students: newLinkStudents, isEditing: false };
        case GENERATE_STUDENT_LINK_FAILED:
            return { ...state, isEditing: false, error: action.payload };
        
        default:
            return state;
    }
};
