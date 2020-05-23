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
import { markPresent, markNotPresent } from '../redux/actions/dataActions';

const styles = {
    checkbox: {
        width: 10,
        height: 10
    }
}

export class PresenceButton extends Component {

    /* state = {
        present: false,
        loading: false
    }

    componentDidMount(){
        this.setState({
            present: this.props.user.present
        })
    }

    isPresent = () => {
        if (this.props.user.present) {
            return true;
        } else {
            return false;
        };
    };

    uncheckButton = () => {
        this.setState({
            loading: true
        });
        this.props.markNotPresent(this.props.user.userId);
        this.setState({
            loading: false
        });
    };

    checkButton = () => {
        this.setState({
            loading: true
        });
        this.props.markPresent(this.props.user.userId);
        this.setState({
            loading: false
        });
    }; */

    render() {
        const { classes, user: { userId, present }, loading } = this.props;

        const isPresent = () => {
            if (present) {
                return true;
            } else {
                return false;
            };
        };

        const uncheckButton = () => {
            this.props.markNotPresent(userId);
        };

        const checkButton = () => {
            this.props.markPresent(userId);
        };
       
        const presenceButton = isPresent() ? (
            <IconButton size="small" onClick={uncheckButton}>
                <CheckCircleIcon color="secondary"/>
            </IconButton>
        ) : (
            <IconButton size="small" onClick={checkButton}>
                <RadioButtonUncheckedIcon color="secondary"/>
            </IconButton>
        )

        const loadingDynamicButton = loading ? (
            <IconButton size="small">
                <CircularProgress size={20} />
            </IconButton>
        ) : (presenceButton);

        return (
            loadingDynamicButton
        )
    }
}

PresenceButton.propTypes = {
    user: PropTypes.object.isRequired,
    markPresent: PropTypes.func.isRequired,
    markNotPresent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    users: state.data.users,
    loading: state.UI.loading
});

const mapActionsToProps = {
    markNotPresent,
    markPresent
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PresenceButton));