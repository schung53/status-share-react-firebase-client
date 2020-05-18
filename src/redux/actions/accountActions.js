import { 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    ADMIN_ACCOUNT,
    SET_APP_NAME,
    SET_DEFAULT_NAME } from '../types';
import axios from 'axios';
import firebase from 'firebase';

// Login 
export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post('/login', userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: SET_AUTHENTICATED });
            // Set admin email here
            if (userData.email === 'don.ta@bccancer.bc.ca') {
                localStorage.setItem('admin', 1);
                dispatch({ type: ADMIN_ACCOUNT });
            };
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// Logout
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    localStorage.removeItem('admin');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

// Fetch name of App
export const getAppName = () => (dispatch) => {
    firebase.firestore()
    .doc('/appName/name')
    .get()
    .then((doc) => {
        dispatch({
            type: SET_APP_NAME,
            payload: doc.data()
        });
    })
    .catch((err) => {
        dispatch({ type: SET_DEFAULT_NAME });
        console.log(err)
    });
};

// Set new name of app
export const setAppName = (newAppName) => (dispatch) => {
    axios
    .post('/appname', newAppName)
    .then((res) => {
        dispatch({
            type: SET_APP_NAME,
            payload: res.data
        });
    })
    .catch((err) => console.log(err)); 
};

// Set token in local storage
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            localStorage.setItem('admin', 0);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
};