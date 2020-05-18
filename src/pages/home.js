import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet'

// Components
import Navbar from '../components/Navbar';
import UpdateBar from '../components/UpdateBar';
import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';

// Redux stuff
import { connect } from 'react-redux';
import store from '../redux/store';
import { getUsers, getTeams } from '../redux/actions/dataActions'
import { logoutUser } from '../redux/actions/accountActions';

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
    }

    render() {
        const { users, teams, loading, appName } = this.props;
        const { classes } = this.props;

        const teamsObj = {};
        this.props.teams.map((team) => {
            teamsObj[team.team] = [];
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
                                <Grid item key={team.team} className={classes.table}>
                                    <TeamTable teamMembers={teamsObj[team.team]} teamName={team.team} />
                                </Grid>)
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