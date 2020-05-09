import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    appBar: {
        top: 'auto',
        bottom: 0
    }
}

export class Navbar extends Component {

    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar} color="transparent">
                <Toolbar variant="dense">
                    <Grid justify="flex-start" container>
                        <Grid item>
                            <Typography variant="overline">
                            © 2020 Lower Mainland Biomedical Engineering. All rights reserved.
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar);