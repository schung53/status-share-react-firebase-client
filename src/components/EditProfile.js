import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

// MUI components
import Dialog from '@material-ui/core/Dialog';
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
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

// Redux stuff
import { connect } from 'react-redux';
import { editProfile } from '../redux/actions/dataActions'

const styles = {
    closeButton: {
        textAlign: 'center',
        position: 'absolute',
        left: '90%',
        marginTop: 7
    },
    icon: {
        margin: 'auto 5px auto auto'
    },
    dialogContent: {
        textAlign: 'center',
        height: 250
    },
    memo: {
        marginTop: 30
    },
    otherText: {
        marginTop: 8
    }
}

export class EditProfile extends Component {
    state = {
        phone: "",
        email: "",
        team: "",
        memo: "",
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserToState();
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    mapUserToState = () => {
        this.setState({
            phone: this.props.user.phone,
            email: this.props.user.email,
            team: this.props.user.team,
            memo: this.props.user.memo
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const profileData = {
            phone: this.state.phone,
            email: this.state.email,
            team: this.state.team.trim(),
            memo: this.state.memo
        };
        this.props.editProfile(this.props.user.userId, profileData);
        this.handleClose();
    }

    render() {
        const { classes, user: { name, phone, email, team, memo } } = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleOpen} variant="outlined" color="secondary">
                    <EditIcon className={classes.icon}/>  edit
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        Edit {name}'s Profile
                    </DialogTitle>
                    <form>
                    <DialogContent className={classes.dialogContent}>
                        <Grid container justify='space-between'>
                        <Grid item>
                        <TextField
                            id="phone"
                            name="phone"
                            type="phone"
                            label="Phone"
                            placeholder={phone}
                            value={this.state.phone}
                            onChange={this.handleChange}
                            className={classes.otherText}
                        />
                        </Grid>
                        <Grid item>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder={email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.otherText}
                        />
                        </Grid>
                        <Grid item>
                        <TextField
                            id="team"
                            name="team"
                            type="team"
                            label="Team"
                            placeholder={team}
                            value={this.state.team}
                            onChange={this.handleChange}
                            className={classes.otherText}
                        />
                        </Grid>
                        </Grid>
                        <TextField
                            id="memo"
                            name="memo"
                            type="memo"
                            label="Memo"
                            variant="filled" 
                            multiline
                            rows="2"
                            placeholder={memo}
                            value={this.state.memo}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.memo}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} variant="outlined" color="secondary" type="submit">
                            <SendIcon className={classes.icon}/>submit
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.data.user
});

const mapActionsToProps = {
    editProfile
}

EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditProfile));
