import { ISprint } from "./SprintInterface";
import { ILesson } from "./LessonInterface";

export interface ISprintsReducer {
    addingSprint: boolean,
    deletingSprint: boolean,
    updatingSprint: boolean,
    gettingSprints: boolean,
    gettingLessons: boolean,
    updatingLessons: boolean,
    editingLesson: boolean,
    lessonsLoaded: boolean,
    addingLesson: boolean,
    deletingLesson: boolean,
    selectedSprint: null | ISprint,
    selectedLessons: ILesson[],
    lessons: {},
    sprints: { [ id: string ]: ISprint },
    error: "",
}