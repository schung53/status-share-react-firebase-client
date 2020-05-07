import { 
    LOADING_UI, 
    SET_USER, 
    SET_USERS, 
    STOP_LOADING_UI, 
    CLEAR_ERRORS, 
    LOADING_DATA,
    MARK_PRESENT,
    MARK_NOT_PRESENT,
    SET_ERRORS,
    UPDATE_STATUS,
    EDIT_USER,
    DELETE_USER } from '../types';
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

// Update user status
export const updateStatus = (userId, statusData) => (dispatch) => {
    axios
    .post(`/user/status/${userId}`, statusData)
    .then((res) => {
        dispatch({
            type: UPDATE_STATUS,
            payload: res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

// Delete user status
export const deleteStatus = (userId) => (dispatch) => {
    axios
    .post(`/user/status/${userId}`, { status: "" })
    .then((res) => {
        dispatch({
            type: UPDATE_STATUS,
            payload: res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

// Mark a user as present
export const markPresent = (userId) => (dispatch) => {
    axios
    .post(`/user/presence/${userId}`, { present: true })
    .then((res) => {
        dispatch({
            type: MARK_PRESENT,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};

// Mark a user as not present
export const markNotPresent = (userId) => (dispatch) => {
    axios
    .post(`/user/presence/${userId}`, { present: false })
    .then((res) => {
        dispatch({
            type: MARK_NOT_PRESENT,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};

// Edit a user's profile (including memo)
export const editProfile = (userId, profileData) => (dispatch) => {
    axios
    .post(`/user/${userId}`, profileData)
    .then((res) => {
        dispatch({
            type: EDIT_USER,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
}

// Delete a user
export const deleteUser = (userId) => (dispatch) => {
    axios
    .delete(`/user/${userId}`)
    .then((res) => {
        dispatch({
            type: DELETE_USER,
            payload: userId
        });
    })
    .catch((err) => console.log(err));
}

// Clear all errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};