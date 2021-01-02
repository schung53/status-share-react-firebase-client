import { 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI, 
    SET_AUTHENTICATED, 
    SET_UNAUTHENTICATED, 
    ADMIN_ACCOUNT,
    SET_APP_NAME,
    SET_DEFAULT_NAME,
    TRUNCATE_APP_NAME,
    DETRUNCATE_APP_NAME } from '../types';
import axios from 'axios';
import firebase from 'firebase';
const { validateLoginData } = require("../../util/validators");

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
            }
            // Set view-only email here
            if (userData.email === 'radtherapy@bccancer.bc.ca') {
                localStorage.setItem('viewOnly', 1);
            }
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// Login when "Remember Me" is selected
export const persistentLogin = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    const { valid, errors } = validateLoginData(userData);
    if (!valid) dispatch({
        type: SET_ERRORS,
        payload: errors
    })

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        return firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
    })
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        setAuthorizationHeader(token);
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: SET_AUTHENTICATED });
        if (userData.email === 'don.ta@bccancer.bc.ca') {
            localStorage.setItem('admin', 1);
            dispatch({ type: ADMIN_ACCOUNT });
        }
        if (userData.email === 'radtherapy@bccancer.bc.ca') {
            localStorage.setItem('viewOnly', 1);
        }
        history.push('/');
        return token;
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: {general: "Wrong credentials, please try again"}
        });
    });
};

// Retrieves new token if expired or non-existent
export const refreshToken = () => (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user.getIdToken()
            .then((token) => {
                setAuthorizationHeader(token);
                dispatch({ type: SET_AUTHENTICATED });
            })
            .catch((err) => {
                console.log(err);
            })
        }
    });
};

// Logout
export const logoutUser = () => (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
        localStorage.removeItem('FBIdToken');
        localStorage.removeItem('admin');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('viewOnly');
        delete axios.defaults.headers.common['Authorization'];
    })
    .catch((err) => {
        console.log(err)
    })
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

// Set shortened app name on navbar on mobile
export const truncateAppName = () => (dispatch) => {
    dispatch({ type: TRUNCATE_APP_NAME });
};

// Show full app name on navbar
export const detruncateAppName = () => (dispatch) => {
    dispatch({ type: DETRUNCATE_APP_NAME });
};

// Set token in local storage
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};
