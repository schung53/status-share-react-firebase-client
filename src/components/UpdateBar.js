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
        top: 'auto',
        bottom: 0
    }
}

export class Navbar extends Component {

    render() {
        const { classes, updateTime } = this.props;
        return (
            <AppBar className={classes.appBar} color="transparent">
                <Toolbar variant="dense">
                    <Grid justify="flex-start" container>
                        <Grid item>
                            <Typography>
                            Most recently updated at: {dayjs(updateTime).format('h:mm:ss a, MMMM DD YYYY')}
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