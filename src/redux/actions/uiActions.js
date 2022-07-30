import { 
    SET_DARKMODE } from '../types';

export const setDarkMode = (darkMode) => (dispatch) => {
    dispatch({
        type: SET_DARKMODE,
        payload: darkMode
    }) 
}