import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// Redux stuff
import { connect } from 'react-redux';
import { markPresent } from '../redux/actions/dataActions'

const styles = {
    checkbox: {
        width: 10,
        height: 10
    }
}


// Gonna need to pass in userId as well as team name
export class PresenceButton extends Component {
    /* constructor(){
        super();
        this.state = {
            present: false,
            userId: ""
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ present: nextProps.UI.errors });
        };
    }; */
    

    

    render() {
        const { classes, present, userId } = this.props;
        const isPresent = () => {
            if (present) {
                return true;
            } else {
                return false;
            };
        };

        const uncheckButton = () => {
            this.props.markNotPresent(userId, { present: false });
        };

        const checkButton = () => {
            this.props.markPresent(userId, { present: true });
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
        return (
            presenceButton
        )
    }
}

PresenceButton.propTypes = {
    present: PropTypes.bool.isRequired,
    markPresent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
    /* markNotpresent, */
    markPresent
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PresenceButton));