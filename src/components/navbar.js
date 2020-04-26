import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      maxHeight: 60
    }
  }));

export class navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar variant="dense">
                    <Grid justify="space-between" container>
                    <Button color="inherit">
                        Status Share
                    </Button>
                    <Button color="inherit" variant="outlined" size="small" component={Link} to="/login">
                        Sign Out
                    </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default navbar
