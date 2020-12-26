import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// MUI components
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Redux stuff
import { connect } from 'react-redux';
import { markPresent, markNotPresent } from '../redux/actions/usersActions';

const styles = {
    checkbox: {
        width: 10,
        height: 10
    }
}

export class PresenceButton extends Component {

    render() {
        const { classes, user: { userId, present }, loading } = this.props;

        const uncheckButton = () => {
            if (!Boolean(parseInt(localStorage.viewOnly))) {
                this.props.markNotPresent(userId);
            }
        };

        const checkButton = () => {
            if (!Boolean(parseInt(localStorage.viewOnly))) {
                this.props.markPresent(userId);
            }
        };

        const presenceButton = present ? (
            <IconButton size="small" onClick={uncheckButton}>
                <CheckCircleIcon color="secondary"/>
            </IconButton>
        ) : (
            <IconButton size="small" onClick={checkButton}>
                <RadioButtonUncheckedIcon color="secondary"/>
            </IconButton>
        )

        return (
            presenceButton
        )
    }
}

PresenceButton.propTypes = {
    user: PropTypes.object.isRequired,
    markPresent: PropTypes.func.isRequired,
    markNotPresent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    loading: state.UI.loading
});

const mapActionsToProps = {
    markNotPresent,
    markPresent
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PresenceButton));