import { SET_ACCOUNT, SET_AUTHENTICATED, SET_UNAUTHENTICATED, ADMIN_ACCOUNT } from '../types';

const initialState ={
    authenticated: false,
    admin: false
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
        case SET_ACCOUNT:
            return {
                authenticated: true,
                ...action.payload
            };
        case ADMIN_ACCOUNT:
            localStorage.setItem('admin', 1);
            return {
                ...state,
                admin: true
            };
        default: 
        return state;
    }
}