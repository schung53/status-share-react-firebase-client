import { 
    LOADING_UI, 
    SET_USER, 
    SET_USERS, 
    STOP_LOADING_UI, 
    CLEAR_ERRORS, 
    LOADING_USERS_DATA,
    MARK_PRESENT,
    MARK_NOT_PRESENT,
    SET_AM,
    SET_PM,
    SET_NO_PERIOD,
    SET_ERRORS,
    UPDATE_STATUS,
    EDIT_USER,
    DELETE_USER,
    ADD_USER,
    SET_UPDATE_TIME,
    LOADING_USER,
    STOP_LOADING_USER } from '../types';
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
                checkinPeriod: doc.data().checkinPeriod,
                memo: doc.data().memo,
                priority: doc.data().priority,
                unreadMessages: doc.data().unreadMessages
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

// Set a user's checkin period to AM
export const setAM = (userId, checkinPeriod) => (dispatch) => {
    dispatch({
        type: SET_AM,
        payload: userId
    });

    axios
    .post(`/user/checkinperiod/${userId}`, {checkinPeriod: "AM"})
    .then((res) => {})
    .catch((err) => {
        // Revert checkin period change if error
        if (checkinPeriod === "PM") {
            dispatch({
                type: SET_PM,
                payload: userId
            });
        }
        if (checkinPeriod === "None") {
            dispatch({
                type: SET_NO_PERIOD,
                payload: userId
            });
        }
        console.log(err);
    })
}

// Set a user's checkin period to PM
export const setPM = (userId, checkinPeriod) => (dispatch) => {
    dispatch({
        type: SET_PM,
        payload: userId
    });

    axios
    .post(`/user/checkinperiod/${userId}`, {checkinPeriod: "PM"})
    .then((res) => {})
    .catch((err) => {
        // Revert checkin period change if error
        if (checkinPeriod === "AM") {
            dispatch({
                type: SET_PM,
                payload: userId
            });
        }
        if (checkinPeriod === "None") {
            dispatch({
                type: SET_NO_PERIOD,
                payload: userId
            });
        }
        console.log(err);
    })
}

// Set a user's checkin period to empty
export const setNoPeriod = (userId, checkinPeriod) => (dispatch) => {
    dispatch({
        type: SET_NO_PERIOD,
        payload: userId
    });

    axios
    .post(`/user/checkinperiod/${userId}`, {checkinPeriod: "None"})
    .then((res) => {})
    .catch((err) => {
        // Revert checkin period change if error
        if (checkinPeriod === "AM") {
            dispatch({
                type: SET_AM,
                payload: userId
            });
        }
        if (checkinPeriod === "PM") {
            dispatch({
                type: SET_PM,
                payload: userId
            });
        }
        console.log(err);
    })
}

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
    dispatch({ type: LOADING_USER });
    
    axios
    .post('/user', newUserData)
    .then((res) => {
        dispatch({ type: STOP_LOADING_USER });
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
