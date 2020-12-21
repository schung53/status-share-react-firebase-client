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
    UPDATE_TEAM,
    DELETE_TEAM } from '../types';

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
            )
            var afterDelete = [
                state.users.slice(0, index_5),
                state.users.slice(index_5+1)
            ];
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
            let index_6 = state.teams.findIndex(
                (team) => team.teamId === action.payload.teamId
            );
            state.teams[index_6].team = action.payload.team;
            state.teams[index_6].priority = action.payload.priority;
            state.teams[index_6].color = action.payload.color;
            return {
                ...state,
                teams: [
                    ...state.teams
                ],
                users: [
                    ...state.users
                ]
            };
        case DELETE_TEAM:
            let index_7 = state.teams.findIndex(
                (team) => team.teamId === action.payload
            );
            var afterDelete1 = [
                state.teams.slice(0, index_7),
                state.teams.slice(index_7+1)
            ];
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