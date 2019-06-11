import { ITas } from "./TASInterface";
import { ISprint } from "./SprintInterface";
import { IInstructor } from "./InstructorInterface";
import { ICourse } from "./CourseInterface";
import { IPms } from "./IPms";

export interface IAutoFillReducer {
    gettingSections: boolean,
    gettingInstructors: boolean,
    gettingTas: boolean,
    gettingPms: boolean,
    updatingInstructor: boolean,
    deletingInstructor: boolean,
    addingInstructor: boolean,
    updatingLesson: boolean,
    deletingLesson: boolean,
    deletingSection: boolean,
    addingSprint: boolean,
    addingLesson: boolean,
    addingTA: boolean,
    updatingTA: boolean,
    deletingTA: boolean,
    gettingCourses: boolean,
    addingCourse: boolean,
    deletingCourse: boolean,
    tas: { [ id: string ]: ITas },
    sprints: { [ id: string ]: ISprint },
    instructors: { [ id: string ]: IInstructor },
    courses: { [ id: string ]: ICourse },
    pms: { [ id: string ]: IPms },
    error: string,
}