import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

// Redux stuff
import { connect } from 'react-redux';
import { getUser } from '../redux/actions/dataActions';

const styles = {
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    closeButton: {
        textAlign: 'center',
        position: 'absolute',
        left: '90%',
        marginTop: 7
    },
    icon: {
        margin: '5px 8px auto 15px'
    },
    statusText: {
        margin: '20px auto 0px 10px'
    },
    text2: {
        margin: '10px auto 0px 10px'
    },
    dialogContent: {
        height: 80
    },
    textField: {
        marginTop: 10
    }
}

export class EditStatus extends Component {
    state = {
        open: false
    };
    
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getUser(this.props.userId);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, user: { name, status }, UI: { loading } } = this.props;

        const dialogMarkup = loading ? (
            <>
            <DialogTitle>Loading...</DialogTitle>
            <DialogContent className={classes.dialogContent}>
            <div className={classes.spinnerDiv}>
                <CircularProgress size={40} thickness={2} />
            </div>
            </DialogContent>
            </>
        ) : (
            <>
            <DialogTitle>Edit {name}'s status</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <TextField variant="filled" size="small" defaultValue={status} fullWidth className={classes.textField}/>
            </DialogContent>
            </>
        )

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small">
                    <EditIcon/>
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    {dialogMarkup}
                    <DialogActions>
                        <Button style={{ color: '#ef5350' }} variant="outlined">
                                <DeleteIcon/>
                        </Button>
                        <Button variant="outlined" color="secondary">
                            <SendIcon/>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.data.user
});

const mapActionsToProps = {
    getUser
}

EditStatus.propTypes = {
    userId: PropTypes.string.isRequired,

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditStatus));
