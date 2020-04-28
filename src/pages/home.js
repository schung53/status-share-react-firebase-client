import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import TeamATable from '../components/TeamATable';
import TeamBTable from '../components/TeamBTable';
import TeamCTable from '../components/TeamCTable';
import TeamDTable from '../components/TeamDTable';
import LoadingTable from '../components/LoadingTable';


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
        let teamBlue = [];
        let teamRed = [];
        let teamWhite = [];
        let teamGreen = [];
        let usersmarkup = this.state.users ? this.state.users.map((user) => {
            if (user.team === "blue") teamBlue.push(user);
            if (user.team === "red") teamRed.push(user);
            if (user.team === "white") teamWhite.push(user);
            if (user.team === "green") teamGreen.push(user);
        }) : []
        
        return (
            <div>
                <Grid container justify="center" spacing={4}>
                    <Grid item>
                        {(teamBlue.length === 0) ? <LoadingTable/> : <TeamATable valueFromParent={teamBlue}/>}
                    </Grid>
                    <Grid item>
                        {(teamRed.length === 0) ? <LoadingTable/> : <TeamBTable valueFromParent={teamRed}/>}
                    </Grid>
                    <Grid item>
                        {(teamWhite.length === 0) ? <LoadingTable/> : <TeamCTable valueFromParent={teamWhite}/>}
                    </Grid>
                    <Grid item>
                        {(teamGreen.length === 0) ? <LoadingTable/> : <TeamDTable valueFromParent={teamGreen}/>}
                    </Grid>                    
                </Grid>
                {/* <Grid container justify="center" spacing={4}>
                    <Grid item>
                        {(teamBlue.length === 0) ? <LoadingTable/> : <TeamBTable valueFromParent={teamBlue}/>}
                    </Grid>
                    <Grid item>
                        {(arr2.length === 0) ? <LoadingTable/> : <TeamCTable valueFromParent={arr2}/>}
                    </Grid>
                </Grid> */}
            </div>
        )
    }
}

export default home;
