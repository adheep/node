import {combineReducers} from 'redux'
import preLoadLoginReducer from './preLoadLoginReducer'

export default combineReducers({
    posts: preLoadLoginReducer
});