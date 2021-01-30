import { 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    STOP_LOADING_UI,
    LOADING_TEAM,
    STOP_LOADING_TEAM,
    LOADING_USER,
    STOP_LOADING_USER } from '../types';

const initialState = {
    loading: false,
    loadingTeam: false,
    loadingUser: false,
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading:true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        case LOADING_TEAM:
            return {
                ...state,
                loadingTeam:true
            };
        case STOP_LOADING_TEAM:
            return {
                ...state,
                loadingTeam: false
            };
        case LOADING_USER:
            return {
                ...state,
                loadingUser: true
            };
        case STOP_LOADING_USER:
            return {
                ...state,
                loadingUser: false
            };
        default:
            return state;
    }
};
