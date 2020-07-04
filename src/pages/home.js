import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet'
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Components
import Navbar from '../components/navbar';
import UpdateBar from '../components/UpdateBar';
import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';

// Redux stuff
import { connect } from 'react-redux';
import store from '../redux/store';
import { getUsers, getTeams, setLoading } from '../redux/actions/dataActions'
import { logoutUser, refreshToken } from '../redux/actions/accountActions';
import { CircularProgress } from '@material-ui/core';

const styles = {
    table: {
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
        height: 50,
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

        this.props.setLoading();

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
        }

        this.props.getTeams();
        this.props.getUsers();
    };

    countdownAndRefresh = () => {
        const decodedToken1 = jwtDecode(localStorage.FBIdToken);
        const timeUntilExpiry1 = decodedToken1.exp * 1000 - Date.now();
        setTimeout(() => {
            this.props.refreshToken();
            this.countdownAndRefresh();
        }, timeUntilExpiry1);
    }

    assignTeams = () => {
        const teamsObj = {};
        this.props.teams.map((team) => {
            teamsObj[team.team] = [];
        });
        this.setState({ teams: teamsObj });
    };

    render() {
        const { users, teams, loading, appName, loading2 } = this.props;
        const { classes } = this.props;

        const teamsObj = {};
        const teamsFields = {};
        this.props.teams.map((team) => {
            teamsObj[team.team] = [];
            teamsFields[team.team] = team;
        });
        this.props.teams.map((team) => {
            users.map((user) => {
                if (user.team === team.team) {
                    teamsObj[team.team].push(user)
                }
            });
        });
        
        return (
            <div>
                <Helmet>
                    <title>{appName} | Home</title>
                </Helmet>
                <Dialog open={loading2}>
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
                                <Box order={teamsFields[team.team].priority} className={classes.table}>
                                    <TeamTable teamMembers={teamsObj[team.team]} teamsFields={teamsFields[team.team]}/>
                                </Box>)
                        })}
                        <Box order={Object.keys(teamsObj).length} className={classes.dummy}></Box>
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
    loading2: state.UI.loading
});

const mapActionsToProps = {
    getUsers,
    getTeams,
    setLoading,
    refreshToken
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));