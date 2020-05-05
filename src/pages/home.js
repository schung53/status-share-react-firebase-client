import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import TeamTable from '../components/TeamTable';
import LoadingTable from '../components/LoadingTable';

import {connect} from 'react-redux';
//import {getScream} from ''

export class home extends Component {

    state = {
        users: null
    };

    componentDidMount(){
        axios.get('/users')
        .then((res) => {
            this.setState({
                users: res.data
            })
        })
    };

    render() {
        let teamA = [];
        let teamB = [];
        let teamC = [];
        let teamD = [];
        let usersmarkup = this.state.users ? this.state.users.map((user) => {
            if (user.team === "blue") { teamA.push(user) 
            } else if (user.team === "red") { teamB.push(user) 
            } else if (user.team === "white") { teamC.push(user) 
            } else if (user.team === "green") { teamD.push(user) };
        }) : []
        
        return (
            <div>
                <Grid container justify="center" spacing={4}>
                    <Grid item>
                        {(teamA.length === 0) ? <LoadingTable/> : <TeamTable teamMembers={teamA} teamName={'Team Blue'}/>}
                    </Grid>
                    <Grid item>
                        {(teamB.length === 0) ? <LoadingTable/> : <TeamTable teamMembers={teamB} teamName={'Team Red'}/>}
                    </Grid>
                    <Grid item>
                        {(teamC.length === 0) ? <LoadingTable/> : <TeamTable teamMembers={teamC} teamName={'Team White'}/>}
                    </Grid>
                    <Grid item>
                        {(teamD.length === 0) ? <LoadingTable/> : <TeamTable teamMembers={teamD} teamName={'Team Green'}/>}
                    </Grid>                    
                </Grid>
            </div>
        )
    }
}

export default home;
