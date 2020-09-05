import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet'
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

// Components
import Navbar from '../components/navbar';
import UpdateBar from '../components/UpdateBar';
import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';
import { CircularProgress } from '@material-ui/core';

// Redux stuff
import { connect } from 'react-redux';
import store from '../redux/store';
import { getUsers, getTeams, setLoading } from '../redux/actions/dataActions'
import { logoutUser, refreshToken } from '../redux/actions/accountActions';
import { SET_AUTHENTICATED } from '../redux/types';

const styles = {
    table: {
        width: 482,
        margin: 15
    },
    spinnerdiv: {
        margin: 'auto 10px auto 15px'
    },
    spinnertext: {
        margin: 'auto auto 10px auto'
    },
    dialog: {
        width: 210
    },
    dummy: {
        width: 482,
        height: 20,
        margin: 15
    }
};

export class home extends Component {
    state = {
        teams: {}
    }

    componentDidMount(){
        //have to move these down
        //add loading ui action
        /* this.props.getTeams();
        this.props.getUsers();

        const decodedToken = jwtDecode(localStorage.FBIdToken);
        const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
        console.log(timeUntilExpiry);
        setTimeout(() => { 
            store.dispatch(logoutUser());
            window.location.href = '/login';
        }, timeUntilExpiry); */

        /* this.props.setLoading();

        const decodedToken = jwtDecode(localStorage.FBIdToken);
        const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
        const rememberMe = localStorage.rememberMe;

        if (rememberMe == 0) {
            if (timeUntilExpiry <= 0) {
                store.dispatch(logoutUser());
                window.location.href = '/login';
            } else {
                setTimeout(() => { 
                    store.dispatch(logoutUser());
                    window.location.href = '/login';
                }, timeUntilExpiry);
            }
        } else {
            if (timeUntilExpiry <= 0) {
                this.props.refreshToken();
                this.countdownAndRefresh();
            } else {
                this.countdownAndRefresh();
            }
        } */

        const token = localStorage.FBIdToken;
        const rememberMe = localStorage.rememberMe;

        // If "Remember Me" is selected
        // Token refresher – ensures token is always valid while logged in
        if (rememberMe == 1) {
            store.dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common['Authorization'] = token;
            if (token) {
                const decodedToken = jwtDecode(token);
                // If token expired, refresh token
                if (decodedToken.exp * 1000 < Date.now()) {
                    store.dispatch(refreshToken());
                    setTimeout(() => {
                        this.countdownAndRefresh();
                    }, 4000)
                // If token valid, set timer until expiry and then refresh token
                } else {
                    this.countdownAndRefresh();
                };
            // If token doesn't exist for some reason, retrieves new token
            } else {
                store.dispatch(refreshToken());
                setTimeout(() => {
                    this.countdownAndRefresh();
                }, 4000)
            };
        
        // If "Remember Me" not selected, logout user when token expires
        } else if (rememberMe == 0) {
            store.dispatch({ type: SET_AUTHENTICATED });
            axios.defaults.headers.common['Authorization'] = token;
            if (token) {
                const decodedToken = jwtDecode(token);
                const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
                if (timeUntilExpiry <= 0) {
                    store.dispatch(logoutUser());
                    window.location.href = '/login';
                } else {
                    setTimeout(() => { 
                        store.dispatch(logoutUser());
                        window.location.href = '/login';
                    }, timeUntilExpiry);
                };
            // If token doesn't exist for some reason, logs user out
            } else {
                /* store.dispatch(logoutUser());
                window.location.href = '/login'; */
            };
            
        };

        this.props.getTeams();
        this.props.getUsers();
    };

    countdownAndRefresh = () => {
        const currentDecodedToken = jwtDecode(localStorage.FBIdToken);
        const currentTimeUntilExpiry = currentDecodedToken.exp * 1000 - Date.now();
        console.log(currentTimeUntilExpiry);
        setTimeout(() => {
            this.props.refreshToken();
            setTimeout(() => {
                this.countdownAndRefresh();
            }, 4000)
        }, currentTimeUntilExpiry);
    }

    render() {
        const { users, teams, loading, appName, loadingPresence, loadingTeam } = this.props;
        const { classes } = this.props;

        const teamsObj = {};
        const teamsFields = {};
        this.props.teams.map((team) => {
            teamsObj[team.teamId] = [];
            teamsFields[team.teamId] = team;
        });
        this.props.teams.map((team) => {
            users.map((user) => {
                if (user.teamId === team.teamId) {
                    teamsObj[team.teamId].push(user)
                }
            });
        });
        
        return (
            <div>
                <Helmet>
                    <title>{appName} | Home</title>
                </Helmet>
                <Dialog open={loadingTeam}>
                    <DialogTitle>
                        <Grid className={classes.dialog}>
                        <Typography variant="overline" className={classes.spinnertext}>Updating team...</Typography>
                        <CircularProgress size={20} className={classes.spinnerdiv} /> 
                        </Grid>
                    </DialogTitle>
                </Dialog>
                <Dialog open={loadingPresence}>
                    <DialogTitle>
                        <Grid className={classes.dialog}>
                        <Typography variant="overline" className={classes.spinnertext}>Updating presence...</Typography>
                        <CircularProgress size={20} className={classes.spinnerdiv} /> 
                        </Grid>
                    </DialogTitle>
                </Dialog>
                <Grid container justify="center">
                    <UpdateBar/> 
                    <Navbar/>
                    {loading ? 
                    <>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    <Grid item className={classes.table}>
                        <LoadingTable/>
                    </Grid>
                    </>
                    :  <>
                        {teams.map((team) => {
                            return (
                                <Box order={teamsFields[team.teamId].priority} className={classes.table}>
                                    <TeamTable teamMembers={teamsObj[team.teamId]} teamsFields={teamsFields[team.teamId]}/>
                                </Box>)
                        })}
                        <Box order={99} className={classes.dummy}></Box>
                        </>}
                </Grid>
            </div>
        )
    }
}

home.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getTeams: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    teams: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    users: state.data.users,
    teams: state.data.teams,
    loading: state.data.loading,
    appName: state.account.appName,
    loadingPresence: state.UI.loading,
    loadingTeam: state.UI.loadingTeam
});

const mapActionsToProps = {
    getUsers,
    getTeams,
    setLoading,
    refreshToken
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));