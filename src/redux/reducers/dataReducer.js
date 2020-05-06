import { SET_USER, 
    SET_USERS, 
    LOADING_DATA, 
    MARK_PRESENT, 
    MARK_NOT_PRESENT, 
    UPDATE_STATUS } from '../types';

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
            state.users[index].present = action.payload.present;
            if (state.user.userId === action.payload.userId) {
                state.user.present = action.payload.present;
            };
            return {
                ...state,
                users: [
                    ...state.users
                ]
            };
        case MARK_NOT_PRESENT:
            let index1 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index1].present = action.payload.present;
            if (state.user.userId === action.payload.userId) {
                state.user.present = action.payload.present;
            };
            return {
                ...state,
                users: [
                    ...state.users
                ]
            };
        case UPDATE_STATUS:
            let index2 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index2].status = action.payload.status;
            state.users[index2].statusTime = action.payload.statusTime;
            if (state.user.userId === action.payload.userId) {
                state.user.status = action.payload.status;
                state.user.statusTime = action.payload.statusTime;
            };
            return {
                ...state
            };
        default:
            return state;
    }
}