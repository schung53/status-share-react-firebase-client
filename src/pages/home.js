import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import TeamATable from '../components/teamATable';

export class home extends Component {
    state = {
        users: null
    }
    componentDidMount(){
        axios.get('/users')
        .then((res) => {
            this.setState({
                users: res.data
            })
        })
        .catch((err) => console.log(err));
    }
    render() {
        let usersMarkup = this.state.users ? (
        this.state.users.map((user) => <p>{user.firstName} {user.lastName}</p>)
        ) : <p>Loading...</p>
        return (
            <div>
                <Grid container justify="center" spacing={5}>
                    <Grid item>
                        <TeamATable/>
                    </Grid>
                    <Grid item>
                        <TeamATable/>
                    </Grid>
                    <Grid item>
                        <TeamATable/>
                    </Grid>
                    <Grid item>
                        <TeamATable/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default home;
