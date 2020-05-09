import { 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    ADMIN_ACCOUNT,
    SET_APP_NAME,
    SET_DEFAULT_NAME } from '../types';

const initialState ={
    authenticated: false,
    admin: false,
    appName: "Status Share"
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case ADMIN_ACCOUNT:
            localStorage.setItem('admin', 1);
            return {
                ...state,
                admin: true
            };
        case SET_APP_NAME:
            return {
                ...state,
                appName: action.payload
            }
        case SET_DEFAULT_NAME:
            return {
                ...state,
                appName: "Status Share"
            };
        default: 
            return state;
    }
}