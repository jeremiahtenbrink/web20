import { ILesson } from "./LessonInterface";

export interface ISprint {
    id: string,
    name: string,
    tk: string,
    week: number,
    course: string,
    lessons: ILesson[]
}