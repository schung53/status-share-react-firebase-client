import { 
    LOADING_TEAMS_DATA, 
    SET_TEAMS,
    ADD_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM } from '../types';

const initialState = {
    loadingTeamsData: false,
    teams: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_TEAMS_DATA:
            return {
                ...state,
                loadingTeamsData: true
            };
        case SET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                loadingTeamsData: false
            };
        case ADD_TEAM:
            return {
                ...state,
                teams: [
                    action.payload,
                    ...state.teams
                ],
                loadingTeamsData: false
            };
        case UPDATE_TEAM:
            let index_1 = state.teams.findIndex(
                (team) => team.teamId === action.payload.teamId
            );
            state.teams[index_1].team = action.payload.team;
            state.teams[index_1].priority = action.payload.priority;
            state.teams[index_1].color = action.payload.color;
            state.teams[index_1].col1 = action.payload.col1;
            state.teams[index_1].col2 = action.payload.col2;
            state.teams[index_1].col3 = action.payload.col3;
            return {
                ...state,
                teams: [
                    ...state.teams
                ]
            };
        case DELETE_TEAM:
            let index_2 = state.teams.findIndex(
                (team) => team.teamId === action.payload
            );
            return {
                ...state,
                teams: [
                    ...state.teams.slice(0, index_2),
                    ...state.teams.slice(index_2 + 1)
                ]
            };
        default:
            return state;
    }
};
