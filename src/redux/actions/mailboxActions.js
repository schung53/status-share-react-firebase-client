import { 
    LOADING_MAILBOX_DATA,
    SET_MAILBOX,
    SET_MESSAGE,
    MARK_MESSAGE_READ,
    DELETE_MESSAGE,
    ADD_MESSAGE,
    EDIT_MESSAGE,
    SET_UPDATE_TIME } from '../types';
import axios from 'axios';
import firebase from 'firebase';

// Fetch mailbox for one user
export const getMailbox = (userId) => (dispatch) => {
    dispatch({ type: LOADING_MAILBOX_DATA });

    firebase.firestore()
    .collection('mailbox')
    .doc(userId.trim())
    .collection('messages')
    .orderBy('timestamp', 'desc')
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

// Mark a message as read
export const markMessageRead = (messageId, userId) => (dispatch) => {
    dispatch({
        type: MARK_MESSAGE_READ,
        payload: messageId
    });

    axios
    .post(`/mailbox/read/${userId}/${messageId}`, { readStatus: true })
    .then((res) => {})
    .catch((err) => {
        console.log(err)
    });
};

// Delete a message
export const deleteMessage = (messageId, userId) => (dispatch) => {
    axios
    .delete(`/mailbox/${userId}/${messageId}`)
    .then(() => {
        dispatch({
            type: DELETE_MESSAGE,
            payload: messageId
        });
    })
    .catch((err) => console.log(err));
};

// Create a new message
export const addMessage = (newMessageData, userId) => (dispatch) => {
    axios
    .post(`/mailbox/${userId}`, newMessageData)
    .then((res) => {
        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
};

// Update a message
export const editMessage = (messageId, userId, messageData) => (dispatch) => {
    dispatch({
        type: EDIT_MESSAGE,
        payload: messageData
    });
    
    axios
    .post(`/mailbox/update/${userId}/${messageId}`, messageData)
    .then((res) => {
        dispatch({
            type: EDIT_MESSAGE,
            payload: messageData
        });
    })
    .catch((err) => console.log(err));
};

// Set selected message
export const setMessage = (messageId) => (dispatch) => {
    dispatch({
        type: SET_MESSAGE,
        payload: messageId
    })
};

// Set state to loading
export const setMailboxLoading = () => (dispatch) => {
    dispatch({ type: LOADING_MAILBOX_DATA });
};
