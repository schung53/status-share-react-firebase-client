import { LOADING_DATA, SET_USER, STOP_LOADING_UI, CLEAR_ERRORS } from '../types';
import axios from 'axios';


export const getUser = (userId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
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

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}