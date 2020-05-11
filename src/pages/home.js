import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';

// Components
import Navbar from '../components/Navbar';
import UpdateBar from '../components/UpdateBar';
import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';

// Redux stuff
import { connect } from 'react-redux';
import store from '../redux/store';
import { getUsers } from '../redux/actions/dataActions'
import { logoutUser } from '../redux/actions/accountActions';

const styles = {
    table: {
        margin: 15
    }
};

export class home extends Component {

    componentDidMount(){
        this.props.getUsers();

        const decodedToken = jwtDecode(localStorage.FBIdToken);
        const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
        console.log(timeUntilExpiry);
        setTimeout(() => { 
            store.dispatch(logoutUser());
            window.location.href = '/login';
        }, timeUntilExpiry);
    };

    render() {
        const { users, loading } = this.props.data;
        const { classes } = this.props;
        const teamA = [];
        const teamB = [];
        const teamC = [];
        const teamD = [];
        const usersMarkup = !loading ? users.map((user) => {
            if (user.team.toLowerCase() === "blue") { teamA.push(user) 
            } else if (user.team.toLowerCase() === "red") { teamB.push(user) 
            } else if (user.team.toLowerCase() === "white") { teamC.push(user) 
            } else if (user.team.toLowerCase() === "green") { teamD.push(user) };
        }) : []
        
        

        return (
                <Grid container justify="center">
                    <UpdateBar/> 
                    <Navbar/>
                    <Grid item className={classes.table}>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamA} teamName={'Team Blue'} teamCode={'blue'} />}
                    </Grid>
                    <Grid item className={classes.table}>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamB} teamName={'Team Red'} teamCode={'red'} />}
                    </Grid>
                    <Grid item className={classes.table}>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamC} teamName={'Team White'} teamCode={'white'} />}
                    </Grid>
                    <Grid item className={classes.table}>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamD} teamName={'Team Green'} teamCode={'green'} />}
                    </Grid>    
                </Grid>
        )
    }
}

home.propTypes = {
    getUsers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    users: state.data.users
});

const mapActionsToProps = {
    getUsers
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));