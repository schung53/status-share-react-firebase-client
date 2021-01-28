import { 
    LOADING_MAILBOX_DATA,
    SET_MAILBOX,
    SET_MESSAGE,
    MARK_MESSAGE_READ,
    DELETE_MESSAGE,
    ADD_MESSAGE,
    SET_UPDATE_TIME } from '../types';
import axios from 'axios';
import firebase from 'firebase';
const { convertDateToInteger } = require("../../util/timestamp");

// Fetch mailbox for one user
export const getMailbox = (userId) => (dispatch) => {
    dispatch({ type: LOADING_MAILBOX_DATA });

    firebase.firestore()
    .collection('mailbox')
    .doc(userId.trim())
    .collection('messages')
    .orderBy('timestamp')
    .limit(25)
    .onSnapshot((snapshot) => {
        let mailbox = [];
        snapshot.forEach((doc) => {
            if (doc) mailbox.push(doc.data());
        });
        dispatch({
            type: SET_MAILBOX,
            payload: mailbox
        });
        dispatch({ type: SET_UPDATE_TIME })
    });
};

// Delete a message
export const deleteMessage = (messageId, userId) => (dispatch) => {
    axios
    .delete(`/mailbox/${userId}/messages/${messageId}`)
    .then(() => {
        dispatch({
            type: DELETE_MESSAGE,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};

// Create a new message
export const addMessage = (newMessageData, userId) => (dispatch) => {
    axios
    .post(`/mailbox/${userId}/messages`, newMessageData)
    .then((res) => {
        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};

// Set state to loading
export const setMailboxLoading = () => (dispatch) => {
    dispatch({ type: LOADING_MAILBOX_DATA });
};
