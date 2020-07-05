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
    DELETE_USER,
    ADD_USER,
    SET_UPDATE_TIME,
    SET_TEAMS,
    ADD_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM } from '../types';
import axios from 'axios';
import firebase from 'firebase';

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
    dispatch({ type: LOADING_UI });
    axios
    .post(`/user/presence/${userId}`, { present: true })
    .then((res) => {
        dispatch({
            type: MARK_PRESENT,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Mark a user as not present
export const markNotPresent = (userId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
    .post(`/user/presence/${userId}`, { present: false })
    .then((res) => {
        dispatch({
            type: MARK_NOT_PRESENT,
            payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
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
    .then(() => {
        dispatch({
            type: DELETE_USER,
            payload: userId
        });
    })
    .catch((err) => console.log(err));
}

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
}

// Get all teams
export const getTeams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    firebase.firestore()
    .collection('teams')
    .orderBy('priority')
    .onSnapshot((snapshot) => {
        let teams = [];
        snapshot.docs.forEach((doc) => {
            teams.push({
                team: doc.data().team,
                priority: doc.data().priority,
                color: doc.data().color,
                teamId: doc.data().teamId
            });
        });
        dispatch({
            type: SET_TEAMS,
            payload: teams
        });
    })
}

// Create new team
export const addTeam = (newTeam) => (dispatch) => {
    axios
    .post('/team', newTeam)
    .then((res) => {
        dispatch({
            type: ADD_TEAM,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
}

// Update team
export const updateTeam = (teamId, teamData) => (dispatch) => {
    axios
    .post(`/team/${teamId}`, teamData)
    .then((res) => {
        dispatch({
            type: UPDATE_TEAM,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
}

// Clear all errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

// Delete team
export const deleteTeam = (teamId, teamToDelete) => (dispatch) => {
    axios
    .post(`/team/delete/${teamId}`, { team: teamToDelete })
    .then(() => {
        dispatch({
            type: DELETE_TEAM,
            payload: teamId
        });
    })
    .catch((err) => console.log(err));
}

// Set state to loading
export const setLoading = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
}