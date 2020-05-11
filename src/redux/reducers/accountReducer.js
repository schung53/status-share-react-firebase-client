import { 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    ADMIN_ACCOUNT,
    SET_APP_NAME,
    SET_DEFAULT_NAME,
    SET_UPDATE_TIME } from '../types';

const initialState ={
    authenticated: false,
    admin: false,
    appName: "",
    updateTime: new Date()
}

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
                admin: false
            };
        case ADMIN_ACCOUNT:
            return {
                ...state,
                admin: true
            };
        case SET_APP_NAME:
            return {
                ...state,
                appName: action.payload.appName
            }
        case SET_DEFAULT_NAME:
            return {
                ...state,
                appName: "Status Share"
            };
        case SET_UPDATE_TIME:
            return {
                ...state,
                updateTime: new Date()
            }
        default: 
            return state;
    }
}