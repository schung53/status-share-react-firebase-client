import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet'
import Box from '@material-ui/core/Box';

// Components
import Navbar from './src/components/Navbar';
import UpdateBar from './src/components/UpdateBar';
import TeamTable from './src/components/TeamTable';
import LoadingTable from './src/components/LoadingTable';

// Redux stuff
import { connect } from 'react-redux';
import store from './src/redux/store';
import { getUsers, getTeams } from './src/redux/actions/dataActions'
import { logoutUser } from './src/redux/actions/accountActions';

const styles = {
    table: {
        margin: 15
    }
};

export class home extends Component {
    state = {
        teams: {}
    }

    componentDidMount(){
        this.props.getTeams();
        this.props.getUsers();

        const decodedToken = jwtDecode(localStorage.FBIdToken);
        const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
        console.log(timeUntilExpiry);
        setTimeout(() => { 
            store.dispatch(logoutUser());
            window.location.href = '/login';
        }, timeUntilExpiry);
    };

    assignTeams = () => {
        const teamsObj = {};
        this.props.teams.map((team) => {
            teamsObj[team.team] = [];
        });
        this.setState({ teams: teamsObj });
    };

    /* compare = (a, b) => {
        const priorityA = parseInt(a.priority, 10);
        const priorityB = parseInt(b.priority, 10);

        let comparison = 0;
        if (priorityA > priorityB) {
            comparison = 1;
        } else if (priorityA < priorityB) {
            comparison = -1;
        }
        return comparison;
    } */

    render() {
        const { users, teams, loading, appName } = this.props;
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
                    </>
                    :  <>{teams.map((team) => {
                            return (
                                <Box order={teamsFields[team.team].priority} className={classes.table}>
                                    <TeamTable teamMembers={teamsObj[team.team]} teamsFields={teamsFields[team.team]}/>
                                </Box>)
                        })}</>}
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
    appName: state.account.appName
});

const mapActionsToProps = {
    getUsers,
    getTeams
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));