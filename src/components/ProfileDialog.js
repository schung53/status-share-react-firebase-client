import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

// MUI components
import Dialog from '@material-ui/core/Dialog'
import Card from '@material-ui/core/Card';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import ProfileButton from './ProfileButton'

// Redux stuff
import { connect } from 'react-redux';
import { getUser, clearErrors } from '../redux/actions/dataActions'

const styles = {
}

export class ProfileDialog extends Component {
    state = {
        open: false
    };

    componentDidMount() {
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getUser(this.props.userId);
    };

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { user: { userId, name } } = this.props;
        return (
            <Fragment>
            <ProfileButton onClick={this.handleOpen} />
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
            <DialogTitle>User Profile</DialogTitle>
            <DialogContent>
                {name}
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            </DialogActions>
            </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.data.user,
    UI: state.UI
});

const mapActionsToProps = {
    getUser,
    clearErrors
}

ProfileDialog.propTypes = {
    userId: PropTypes.string.isRequired,

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProfileDialog))