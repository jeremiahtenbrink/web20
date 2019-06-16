import { ILesson } from "./LessonInterface";

export interface IStudentLesson extends ILesson{
    completed: boolean;
}