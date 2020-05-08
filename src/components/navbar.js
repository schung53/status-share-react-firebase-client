import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import IconButton from '@material-ui/core/IconButton';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/accountActions';

export class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { authenticated } = this.props;
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
                        {authenticated && (<Button onClick={this.handleLogout} color="inherit" variant="outlined" size="small" component={Link} to="/login">
                            Sign Out
                        </Button>)}
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
};
  
const mapStateToProps = (state) => ({
    authenticated: state.account.authenticated
});

const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
