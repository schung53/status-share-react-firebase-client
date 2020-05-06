import { 
    LOADING_UI, 
    SET_USER, 
    SET_USERS, 
    STOP_LOADING_UI, 
    CLEAR_ERRORS, 
    LOADING_DATA,
    MARK_PRESENT,
    MARK_NOT_PRESENT } from '../types';
import axios from 'axios';

// Fetch one user
export const getUser = (userId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
    .get(`/user/${userId}`)
    .then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
    })
    .catch(() => {
        dispatch({
            type: SET_USER,
            payload: null
        });
    });
};

// Fetch all users
export const getUsers = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
    .get('/users')
    .then((res) => {
        dispatch({
            type: SET_USERS,
            payload: res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: SET_USERS,
            payload: []
        });
    });
};

// Mark a user as present
export const markPresent = (userId, presence) => (dispatch) => {
    axios
    .post(`/user/presence/${userId}`, presence)
    .then((res) => {
        dispatch({
            type: MARK_PRESENT,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}