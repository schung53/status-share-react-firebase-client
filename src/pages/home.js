import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';
import { withStyles } from '@material-ui/core/styles';

// Redux stuff
import {connect} from 'react-redux';
import {getUsers} from '../redux/actions/dataActions'

const styles = {
}

export class home extends Component {

    componentDidMount(){
        this.props.getUsers()
    };

    render() {
        const { users, loading } = this.props.data;
        let teamA = [];
        let teamB = [];
        let teamC = [];
        let teamD = [];
        let usersMarkup = !loading ? users.map((user) => {
            if (user.team === "blue") { teamA.push(user) 
            } else if (user.team === "red") { teamB.push(user) 
            } else if (user.team === "white") { teamC.push(user) 
            } else if (user.team === "green") { teamD.push(user) };
        }) : []
        
        return (
                <Grid container justify="center"  spacing={4} >
                    <Grid item>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamA} teamName={'Team Blue'}/>}
                    </Grid>
                    <Grid item>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamB} teamName={'Team Red'}/>}
                    </Grid>
                    <Grid item>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamC} teamName={'Team White'}/>}
                    </Grid>
                    <Grid item>
                        {loading ? <LoadingTable/> : <TeamTable teamMembers={teamD} teamName={'Team Green'}/>}
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
    data: state.data
});

const mapActionsToProps = {
    getUsers
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));