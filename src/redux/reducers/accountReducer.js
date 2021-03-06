import { 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    ADMIN_ACCOUNT,
    SET_APP_NAME,
    SET_DEFAULT_NAME,
    SET_UPDATE_TIME,
    REMEMBER_ME,
    TRUNCATE_APP_NAME,
    DETRUNCATE_APP_NAME } from '../types';

const initialState = {
    authenticated: false,
    admin: false,
    rememberMe: false,
    appName: "",
    truncatedAppName: false,
    updateTime: new Date()
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false,
                admin: false,
                rememberMe: false
            };
        case ADMIN_ACCOUNT:
            return {
                ...state,
                admin: true
            };
        case REMEMBER_ME:
            return {
                ...state,
                rememberMe: true
            };
        case SET_APP_NAME:
            return {
                ...state,
                appName: action.payload.appName
            };
        case SET_DEFAULT_NAME:
            return {
                ...state,
                appName: "Medical Physics: Status Share"
            };
        case SET_UPDATE_TIME:
            return {
                ...state,
                updateTime: new Date()
            };
        case TRUNCATE_APP_NAME:
            return {
                ...state,
                truncatedAppName: true
            };
        case DETRUNCATE_APP_NAME: 
            return {
                ...state,
                truncatedAppName: false
            };
        default: 
            return state;
    }
};
