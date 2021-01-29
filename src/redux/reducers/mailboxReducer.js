import { 
    LOADING_MAILBOX_DATA,
    SET_MAILBOX,
    SET_MESSAGE,
    MARK_MESSAGE_READ,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    ADD_MESSAGE } from '../types';

const initialState = {
    mailbox: [],
    message: {},
    loadingMailbox: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOADING_MAILBOX_DATA:
            return {
                ...state,
                loadingMailbox: true
            };
        case SET_MAILBOX:
            return {
                ...state,
                mailbox: action.payload,
                loadingMailbox: false
            };
        case SET_MESSAGE:
            let index_1 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload
            );
            return {
                ...state,
                message: state.mailbox[index_1]
            };
        case MARK_MESSAGE_READ:
            let index_2 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload
            );
            state.mailbox[index_2].readStatus = true;
            if (state.message.messageId === action.payload) {
                state.message.readStatus = true;
            };
            return {
                ...state,
                mailbox: [
                    ...state.mailbox
                ]
            };
        case DELETE_MESSAGE:
            let index_3 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload
            );
            return {
                ...state,
                mailbox: [
                    ...state.mailbox.slice(0, index_3),
                    ...state.mailbox.slice(index_3 + 1)
                ]
            };
        case ADD_MESSAGE:
            return {
                ...state,
                mailbox: [
                    ...state.mailbox
                ]
            };
        case EDIT_MESSAGE:
            let index_4 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload.messageId
            );
            state.mailbox[index_4].message = action.payload.message;
            state.mailbox[index_4].senderContact = action.payload.senderContact;
            state.mailbox[index_4].senderName = action.payload.senderName;
            state.mailbox[index_4].subject = action.payload.subject;
            if (state.message.messageId === action.payload.messageId) {
                state.message.message = action.payload.message;
                state.message.senderContact = action.payload.senderContact;
                state.message.senderName = action.payload.senderName;
                state.message.subject = action.payload.subject;
            };
            return {
                ...state,
                mailbox: [
                    ...state.mailbox
                ],
                message: state.message
            };
        default:
            return state;
    }
};
