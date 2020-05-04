import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post('/login', userData)
        .then((res) => {
            console.log(res.data);
            this.setState({
                loading: false
            });
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
            axios.default.headers.common['Authorization'] = FBIdToken;
            dispatch({ type: CLEAR_ERRORS })
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

