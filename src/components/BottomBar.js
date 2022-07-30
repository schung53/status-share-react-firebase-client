import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

const styles = {
    appBar: {
        top: "auto",
        bottom: 0
    }
};

export class BottomBar extends Component {

    render() {
        const { classes, truncatedAppName } = this.props;
        const text = truncatedAppName ? (
            <Typography variant="overline">
                © 2020 BC Cancer: Medical Physics...
            </Typography>
        ) : (
            <Typography variant="overline">
                © 2020 BC Cancer: Medical Physics. All rights reserved.
            </Typography>
        )
        return (
            <AppBar className={classes.appBar} color="inherit" position="fixed">
                <Toolbar variant="dense">
                    <Grid justify="flex-start" container>
                        <Grid item>
                            {text}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    };
}

const mapStateToProps = (state) => ({
    truncatedAppName: state.account.truncatedAppName
});

BottomBar.propTypes = {
    truncatedAppName: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, null)(withStyles(styles)(BottomBar));
