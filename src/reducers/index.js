import { combineReducers } from 'redux'
import { studentsReducer } from './studentsReducer'
import { authReducer } from './authReducer'


export default combineReducers({
  students: studentsReducer,
  auth: authReducer,
})