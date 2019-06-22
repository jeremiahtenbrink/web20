import { IStudent } from "./StudentInterface";
import { IStudentLesson } from "./StudentLessonsInterface";
import { ISprint } from "./SprintInterface";

export interface IStudentReducer {
    students: { [ id: string ]: IStudent };
    allStudents: { [ id: string ]: IStudent };
    unsubscribeStudents: null | Function;
    fetchingStudents: boolean;
    isAdding: boolean;
    editingStudent: boolean;
    fetchingStudentLessons: boolean;
    studentLessonsLoaded: boolean;
    completingLesson: boolean;
    error: string;
    deletingStudent: boolean;
    selectedStudent: null | IStudent;
    selectedStudentLessons: null | { [ id: string ]: IStudentLesson | ISprint };
    updatingLessons: boolean;
}