import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { studentsReducer } from "./studentsReducer";
import { authReducer } from "./authReducer";
import { autoFillReducer } from "./autoFillReducer";
import { sprintsReducer } from "./sprintsReducer";
import { subscriptionReducer } from "./subscriptionReducer";

export default ( history ) => combineReducers( {
    router: connectRouter( history ),
    students: studentsReducer,
    auth: authReducer,
    autoFill: autoFillReducer,
    sprints: sprintsReducer,
    subscriptions: subscriptionReducer,
} )