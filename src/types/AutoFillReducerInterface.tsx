import { ITa } from "./TASInterface";
import { ISprint } from "./SprintInterface";
import { IInstructor } from "./InstructorInterface";
import { ICourse } from "./CourseInterface";
import { IPm } from "./IPm";
import { IProjectManagers } from "./ProjectManagersInterface";
import { ICourses } from "./CoursesInterface";
import { IInstructors } from "./InstructorsInterface";

export interface IAutoFillReducer {
    gettingSections: boolean;
    gettingInstructors: boolean;
    gettingTas: boolean;
    gettingPms: boolean;
    updatingInstructor: boolean;
    deletingInstructor: boolean;
    addingInstructor: boolean;
    updatingLesson: boolean;
    deletingLesson: boolean;
    deletingSection: boolean;
    addingSprint: boolean;
    addingLesson: boolean;
    addingTA: boolean;
    updatingTA: boolean;
    deletingTA: boolean;
    gettingCourses: boolean;
    addingCourse: boolean;
    deletingCourse: boolean;
    tas: ITa | {};
    instructors: IInstructors;
    courses: ICourses;
    pms: IProjectManagers;
    error: string;
}