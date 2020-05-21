import { 
    SET_USER, 
    SET_USERS, 
    LOADING_DATA, 
    MARK_PRESENT, 
    MARK_NOT_PRESENT, 
    UPDATE_STATUS,
    EDIT_USER,
    DELETE_USER,
    ADD_USER,
    SET_TEAMS,
    ADD_TEAM,
    UPDATE_TEAM } from '../types';

const initialState = {
    users: [],
    user: {},
    loading: false,
    teams: []
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
        case EDIT_USER:
            let index3 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index3].email = action.payload.email;
            state.users[index3].phone = action.payload.phone;
            state.users[index3].team = action.payload.team;
            state.users[index3].memo = action.payload.memo;
            if (state.user.userId === action.payload.userId) {
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
            let index4 = state.users.findIndex(
                (user) => user.userId === action.payload
            )
            state.users.splice(index4, 1)
            return {
                ...state,
                users: [
                    ...state.users
                ]
            };
        case ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users
                ]
            };
        case SET_TEAMS:
            return {
                ...state,
                teams: action.payload
            };
        case ADD_TEAM:
            return {
                ...state,
                teams: [
                    action.payload,
                    ...state.teams
                ]
            };
        case UPDATE_TEAM:
            let index5 = state.teams.findIndex(
                (team) => team.teamId === action.payload.teamId
            );
            state.teams[index5].priority = action.payload.priority;
            state.teams[index5].color = action.payload.color;
            return {
                ...state,
                teams: [
                    ...state.teams
                ]
            };
        default:
            return state;
    }
}