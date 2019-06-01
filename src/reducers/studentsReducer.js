import {
    FETCH_STUDENTS_INIT, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_FAILED,
    ADD_STUDENT_INIT, ADD_STUDENT_SUCCESS, ADD_STUDENT_FAILED,
    DEL_STUDENT_SUCCESS, DEL_STUDENT_FAILED, DEL_STUDENT_INIT,
    EDIT_STUDENT_INIT, EDIT_STUDENT_SUCCESS, EDIT_STUDENT_FAILED,
    COLLECT_STUDENT_LESSONS_FAILED, COLLECT_STUDENT_LESSONS_INIT,
    COLLECT_STUDENT_LESSONS_SUCCESS, COMPLETE_LESSON_INIT,
    COMPLETE_LESSON_SUCCESS, COMPLETE_LESSON_FAILED, CHANGE_SELECTED_STUDENT
} from "../actions";

const initialState = {
    students: [],
    fetchingStudents: true,
    isAdding: false,
    editingStudent: false,
    fetchingStudentLessons: false,
    studentLessonsLoaded: false,
    completingLesson: false,
    error: "",
    deletingStudent: false,
    selectedStudent: null,
    selectedStudentLessons: null,
};

export const studentsReducer = ( state = initialState, action ) => {
    
    switch( action.type ){
        
        //CHANGE SELECTED STUDENT ---------------------------------------
        
        case CHANGE_SELECTED_STUDENT:
            let selectedStudent = state.students.filter(
                student => student.id === action.payload )[ 0 ];
            return { ...state, selectedStudent };
        
        //STUDENT ADD ----------------------------------------------------
        
        case ADD_STUDENT_INIT:
            return { ...state, isAdding: true };
        case ADD_STUDENT_SUCCESS:
            
            return {
                ...state, students: [
                    ...state.students, action.payload
                ], isAdding: false,
            };
        case ADD_STUDENT_FAILED:
            return { ...state, isAdding: false, error: action.payload };
        
        //STUDENT FETCH ----------------------------------------------------
        
        case FETCH_STUDENTS_INIT:
            return { ...state, fetchingStudents: true };
        case FETCH_STUDENTS_SUCCESS:
            
            return {
                ...state, fetchingStudents: false, students: action.payload
            };
        case FETCH_STUDENTS_FAILED:
            return { ...state, fetchingStudents: false, error: action.payload };
        
        //STUDENT DELETE ----------------------------------------------------
        
        case DEL_STUDENT_INIT:
            return { ...state, deletingStudent: true };
        case DEL_STUDENT_SUCCESS:
            let students = state.students;
            delete students[ action.payload ];
            return { ...state, students: { ...students } };
        case DEL_STUDENT_FAILED:
            return { ...state, deletingStudent: false, error: action.payload };
        
        //STUDENT EDIT -----------------------------------------------------
        
        case EDIT_STUDENT_INIT:
            return { ...state, editingStudent: true };
        case EDIT_STUDENT_SUCCESS:
            let studentsEdited = state.students.map( student => {
                if( student.id === action.payload.id ){
                    return action.payload;
                }
                return student;
            } );
            return {
                ...state, students: studentsEdited, editingStudent: false
            };
        case EDIT_STUDENT_FAILED:
            return { ...state, editingStudent: false, error: action.payload };
        
        //STUDENT FETCHING LESSONS ------------------------------------------
        
        case COLLECT_STUDENT_LESSONS_INIT:
            return {
                ...state,
                selectedStudentLessons: null,
                fetchingStudentLessons: true,
                studentLessonsLoaded: false,
            };
        case COLLECT_STUDENT_LESSONS_SUCCESS:
            return {
                ...state,
                selectedStudentLessons: action.payload,
                fetchingStudentLessons: false,
                studentLessonsLoaded: true
            };
        case COLLECT_STUDENT_LESSONS_FAILED:
            return {
                ...state,
                selectedStudentLessons: null,
                fetchingStudentLessons: false,
                studentLessonsLoaded: false,
                error: action.payload
            };
        
        //COMPLETE LESSON -----------------------------------------------------
        
        case COMPLETE_LESSON_INIT:
            return { ...state, updatingLessons: true };
        case COMPLETE_LESSON_SUCCESS:
            
            
            state.selectedStudentLessons[ action.payload.id ] = { ...action.payload };
            return {
                ...state,
                updatingLessons: false,
                selectedStudentLessons: { ...state.selectedStudentLessons }
            };
        
        case
        COMPLETE_LESSON_FAILED:
            return { ...state, updatingLessons: false, error: action.payload };
        
        // DEFAULT ----------------------------------------------------------
        
        default:
            return state;
    }
};
