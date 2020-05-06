import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

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
    

    /* componentDidMount(){
        this.setState({
            users: this.props.users
        });
    } */

    render() {
        const { classes, user: { userId, present } } = this.props;
        const index = this.props.users.findIndex(
            (user) => user.userId === userId
        );

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
    users: state.data.users
});

const mapActionsToProps = {
    markNotPresent,
    markPresent
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PresenceButton));