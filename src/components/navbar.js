import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';

export class Navbar extends Component {
/*     constructor(props) {
        super(props);
        this.state = {}

        this.handleClick = this.handleClick.bind(this);
    } */

    render() {
        return (
            <AppBar>
                <Toolbar variant="dense">
                    <Grid justify="space-between" container>
                        <Grid>
                            <IconButton size="small">
                                <CheckCircleOutlineIcon style={{ color: '#ffffff' }}/>
                            </IconButton>
                            <Button color="inherit">
                                Status Share
                            </Button>
                        </Grid>
                        <Button color="inherit" variant="outlined" size="small" component={Link} to="/login">
                            Sign Out
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
