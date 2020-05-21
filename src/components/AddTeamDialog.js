import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

// Redux stuff
import { connect } from 'react-redux';
import { addTeam } from '../redux/actions/dataActions';

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
};

export class AddTeamDialog extends Component {
    state = {
        open: false,
        team: "",
        priority: "",
        color: "#1a237e"
    }
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const newTeamData = {
            team: this.state.team.trim(),
            priority: this.state.priority.trim(),
            color: this.state.color.trim()
        };
        this.props.addTeam(newTeamData);
        this.handleClose();
        this.setState({
            open: false,
            team: "",
            priority: "",
            color: ""
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, teamName } = this.props;
        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small" style={{ color: '#ffffff' }}>
                    <AddIcon />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="xs">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle>
                        Add a new team
                    </DialogTitle>
                    <form>
                    <DialogContent className={classes.dialogContent}>
                        <TextField
                            id="team"
                            name="team"
                            type="team"
                            label="Team Name"
                            value={this.state.team}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                        <TextField
                            id="priority"
                            name="priority"
                            type="priority"
                            label="Priority (e.g. 1)"
                            value={this.state.priority}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                        <TextField
                            id="color"
                            name="color"
                            type="color"
                            label="Color"
                            value={this.state.color}
                            onChange={this.handleChange}
                            className={classes.otherText}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSubmit} variant="outlined" color="secondary" type="submit">
                            <AddIcon className={classes.icon}/>create team
                        </Button>
                    </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    addTeam
}

AddTeamDialog.propTypes = {
    addUser: PropTypes.func.isRequired,
    teamName: PropTypes.string.isRequired,
    teamCode: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddTeamDialog));