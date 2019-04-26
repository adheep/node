import {PRE_LOAD_LOGIN, LOGIN} from '../actions/types'

const initialState = {
    ownerId: 0,
    mode: '',
    environment: '',
    token: '',
    role: '',
    userType: '',
    userId: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PRE_LOAD_LOGIN:
            return {
                ...state,
                ownerId: action.payload.OwnerId,
                mode: action.payload.Mode,
                environment: action.payload.Environment
            }
        case LOGIN:
            return {
                ...state,
                token: action.payload.Token,
                role: action.payload.UserRole,
                userType: action.payload.UserPrimaryObjectType,
                userId: action.payload.UserPrimaryObjectId
            }
        default:
            return state;
    }
}