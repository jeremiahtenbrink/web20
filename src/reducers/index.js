import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { studentsReducer } from "./studentsReducer";
import { authReducer } from "./authReducer";
import { autoFillReducer } from "./autoFillReducer";
import { studentFormReducer } from "./studentsFormReducer";

export default ( history ) => combineReducers( {
    router: connectRouter( history ),
    students: studentsReducer,
    auth: authReducer,
    autoFill: autoFillReducer,
    studentForm: studentFormReducer,
} )