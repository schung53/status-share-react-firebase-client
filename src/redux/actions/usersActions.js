import { 
    LOADING_UI, 
    SET_USER, 
    SET_USERS, 
    STOP_LOADING_UI, 
    CLEAR_ERRORS, 
    LOADING_USERS_DATA,
    MARK_PRESENT,
    MARK_NOT_PRESENT,
    SET_ERRORS,
    UPDATE_STATUS,
    EDIT_USER,
    DELETE_USER,
    ADD_USER,
    SET_UPDATE_TIME } from '../types';
import axios from 'axios';
import firebase from 'firebase';

// Fetch one user
export function getUser(userId) {
    return (dispatch, getState) => {
        dispatch({ type: LOADING_UI });

        const users = getState().users.users;
        const user = users.find((element) => 
            element.userId === userId
        );

        if (user) {
            dispatch({
                type: SET_USER,
                payload: user
            });
            dispatch({ type: STOP_LOADING_UI });
        } else {
            dispatch({
                type: SET_USER,
                payload: null
            });
            dispatch({ type: STOP_LOADING_UI });
        }
    };
};

// Fetch all users
export const getUsers = () => (dispatch) => {
    dispatch({ type: LOADING_USERS_DATA });

    firebase.firestore()
    .collection('users')
    .orderBy('priority')
    .onSnapshot((snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
            users.push({
                userId: doc.id,
                email: doc.data().email,
                name: doc.data().name,
                phone: doc.data().phone,
                team: doc.data().team,
                teamId: doc.data().teamId,
                status: doc.data().status,
                statusTime: doc.data().statusTime,
                present: doc.data().present,
                memo: doc.data().memo,
                priority: doc.data().priority
            });
        });
        dispatch({
            type: SET_USERS,
            payload: users
        });
        dispatch({ type: SET_UPDATE_TIME })
    });
};

// Update user status
export const updateStatus = (userId, statusData) => (dispatch) => {
    dispatch({
        type: UPDATE_STATUS,
        payload: statusData
    });

    axios
    .post(`/user/status/${userId}`, statusData)
    .then((res) => {})
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

// Mark a user as present
export const markPresent = (userId) => (dispatch) => {
    dispatch({
        type: MARK_PRESENT,
        payload: userId
    });

    axios
    .post(`/user/presence/${userId}`, { present: true })
    .then((res) => {})
    .catch((err) => {
        // Revert presence change if error
        dispatch({
            type: MARK_NOT_PRESENT,
            payload: userId
        });
        console.log(err)
    });
};

// Mark a user as not present
export const markNotPresent = (userId) => (dispatch) => {
    dispatch({
        type: MARK_NOT_PRESENT,
        payload: userId
    });

    axios
    .post(`/user/presence/${userId}`, { present: false })
    .then((res) => {})
    .catch((err) => {
        // Revert presence change if error
        dispatch({
            type: MARK_PRESENT,
            payload: userId
        });
        console.log(err);
    });
};

// Edit a user's profile (including memo)
export const editProfile = (userId, profileData) => (dispatch) => {
    dispatch({
        type: EDIT_USER,
        payload: profileData
    });

    axios
    .post(`/user/${userId}`, profileData)
    .then((res) => {})
    .catch((err) => console.log(err));
};

// Delete a user
export const deleteUser = (userId) => (dispatch) => {
    dispatch({
        type: DELETE_USER,
        payload: userId
    });

    axios
    .delete(`/user/${userId}`)
    .then(() => {})
    .catch((err) => console.log(err));
};

// Create a new user
export const addUser = (newUserData) => (dispatch) => {
    axios
    .post('/user', newUserData)
    .then((res) => {
        dispatch({
            type: ADD_USER,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};

// Clear all errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Set state to loading
export const setLoading = () => (dispatch) => {
    dispatch({ type: LOADING_USERS_DATA });
};
