import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// MUI components
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { markPresent, markNotPresent } from '../redux/actions/usersActions';

const styles = {
    checkbox: {
        width: 10,
        height: 10
    }
};

export class PresenceButton extends Component {

    render() {
        const { user: { userId, present }, darkMode, loading} = this.props;

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
                {loading ? (
                    <CircularProgress color="inherit" size={30} sx={styles.progress}/>
                ) : (
                    <CheckCircleIcon color={darkMode ? "action" : "secondary"}/>
                )}
                
            </IconButton>
        ) : (
            <IconButton size="small" onClick={checkButton}>
                {loading ? (
                    <CircularProgress color="inherit" size={30} sx={styles.progress}/>
                ) : (
                    <RadioButtonUncheckedIcon color={darkMode ? "action" : "secondary"}/>
                )}
            </IconButton>
        )

        return (
            presenceButton
        )
    };
}

const mapStateToProps = (state) => ({
    users: state.users.users,
    darkMode: state.UI.darkMode,
    loading: state.UI.loading
});

const mapActionsToProps = {
    markNotPresent,
    markPresent
};

PresenceButton.propTypes = {
    markNotPresent: PropTypes.func.isRequired,
    markPresent: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PresenceButton));
