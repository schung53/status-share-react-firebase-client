import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Redux stuff
import { connect } from 'react-redux';

const styles = {
    appBar: {
        top: 42,
        height: 40
    }
}

export class Navbar extends Component {

    render() {
        const { classes, updateTime } = this.props;
        return (
            <AppBar className={classes.appBar} color="inherit">
                <Toolbar variant="dense">
                    <Grid justify="flex-start" alignItems="center" container>
                        <Grid item>
                            <Typography variant="body2">
                                Last updated at: {dayjs(updateTime).format('h:mm:ss a, MMMM DD YYYY')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    updateTime: state.account.updateTime
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar));