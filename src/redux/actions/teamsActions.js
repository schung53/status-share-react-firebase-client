import { 
    LOADING_TEAMS_DATA,
    SET_TEAMS,
    ADD_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM,
    LOADING_TEAM,
    STOP_LOADING_TEAM } from '../types';
import axios from 'axios';
import firebase from 'firebase';

// Get all teams
export const getTeams = () => (dispatch) => {
    dispatch({ type: LOADING_TEAMS_DATA });

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
    });
};

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
};

// Update team
export const updateTeam = (teamId, teamData) => (dispatch) => {
    dispatch({ type: LOADING_TEAM });
    axios
    .post(`/team/${teamId}`, teamData)
    .then((res) => {
        dispatch({ type: STOP_LOADING_TEAM })
        dispatch({
            type: UPDATE_TEAM,
            payload: res.data
        });
    })
    .catch((err) => console.log(err));
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
};
