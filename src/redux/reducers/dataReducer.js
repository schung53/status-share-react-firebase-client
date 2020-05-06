import { SET_USER, SET_USERS, LOADING_DATA, MARK_PRESENT, MARK_NOT_PRESENT } from '../types';

const initialState = {
    users: [],
    user: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case MARK_PRESENT:
            let index = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index] = action.payload;
            if (state.user.userId === action.payload.userId) {
                state.user = action.payload;
            }
            
        default:
            return state;
    }
}