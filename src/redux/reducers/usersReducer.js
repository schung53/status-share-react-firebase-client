import { 
    SET_USER, 
    SET_USERS, 
    LOADING_USERS_DATA, 
    MARK_PRESENT, 
    MARK_NOT_PRESENT, 
    UPDATE_STATUS,
    EDIT_USER,
    DELETE_USER,
    ADD_USER } from '../types';

const initialState = {
    users: [],
    user: {},
    loadingUsersData: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_USERS_DATA:
            return {
                ...state,
                loadingUsersData: true
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
                loadingUsersData: false
            };
        case MARK_PRESENT:
            let index_1 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index_1].present = true;
            if (state.user.userId === action.payload) {
                state.user.present = true;
            };
            return {
                ...state,
                users: [
                    ...state.users
                ]
            };
        case MARK_NOT_PRESENT:
            let index_2 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index_2].present = false;
            if (state.user.userId === action.payload.userId) {
                state.user.present = false;
            };
            return {
                ...state,
                users: [
                    ...state.users
                ]
            }; 
        case UPDATE_STATUS:
            let index_3 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index_3].status = action.payload.status;
            state.users[index_3].statusTime = action.payload.statusTime;
            if (state.user.userId === action.payload.userId) {
                state.user.status = action.payload.status;
                state.user.statusTime = action.payload.statusTime;
            };
            return {
                ...state
            };
        case EDIT_USER:
            let index_4 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index_4].name = action.payload.name;
            state.users[index_4].email = action.payload.email;
            state.users[index_4].phone = action.payload.phone;
            state.users[index_4].team = action.payload.team;
            state.users[index_4].memo = action.payload.memo;
            if (state.user.userId === action.payload.userId) {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.phone = action.payload.phone;
                state.user.team = action.payload.team;
                state.user.memo = action.payload.memo;
            };
            return {
                ...state,
                users: state.users,
                user: state.user
            };
        case DELETE_USER:
            let index_5 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            return {
                ...state,
                users: [
                    ...state.users.slice(0, index_5),
                    ...state.users.slice(index_5 + 1)
                ]
            };
        case ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users
                ]
            };
        default:
            return state;
    }
};
