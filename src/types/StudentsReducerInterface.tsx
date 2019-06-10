import { IStudent } from "./StudentInterface";

export interface IStudentReducer {
    students: { [ id: string ]: IStudent }
    unsubscribeStudents: null | Function,
    fetchingStudents: boolean,
    isAdding: boolean,
    editingStudent: boolean,
    fetchingStudentLessons: boolean,
    studentLessonsLoaded: boolean,
    completingLesson: boolean,
    error: string,
    deletingStudent: boolean,
    selectedStudent: null | IStudent,
    selectedStudentLessons: null | object,
    updatingLessons: boolean
}