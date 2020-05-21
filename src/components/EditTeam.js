import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { GithubPicker } from 'react-color';

// MUI components
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

// Redux stuff
import { connect } from 'react-redux';
import { updateTeam, deleteTeam } from '../redux/actions/dataActions';

const styles = {
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
        height: 150
    },
    textField: {
        margin: '10px 20px auto 20px'
    },
    icon: {
        margin: 'auto 5px auto auto'
    }
}

export class EditTeam extends Component {

    state = {
        open: false,
        team: "",
        priority: "",
        color: ""
    };
    
    handleOpen = () => {
        this.setState({ 
            open: true,
            team: this.props.teamsFields.team,
            priority: this.props.teamsFields.priority,
            color: this.props.teamsFields.color
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const teamData = {
            priority: this.state.priority,
            color: this.state.color
        };
        this.props.updateTeam(this.props.teamId, teamData);
        this.handleClose();
    };
    
    handleDelete = (event) => {
        event.preventDefault();
        const teamToDelete = {
            team: this.props.teamName
        };
        this.props.deleteTeam(this.props.teamId, this.props.teamName);
        this.handleClose();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleColorChange = (color) => {
        this.setState({
            color: color.hex
        })
    }

    render() {
        const { classes, teamsFields } = this.props;

        const dialogMarkup = 
            <>
            <DialogTitle>Edit {teamsFields.team}</DialogTitle>
            <form>
            <DialogContent className={classes.dialogContent}>
                <Grid container justify="center">
                <Grid item>
                <GithubPicker 
                    color={ this.state.color }
                    onChange={this.handleColorChange}/>
                </Grid>
                <Grid item>
                <TextField 
                    id="priority"
                    name="priority"
                    type="priority"
                    label="Priority"
                    placeholder={teamsFields.priority}
                    value={this.state.priority}
                    onChange={this.handleChange}
                    className={classes.textField}
                    /* fullWidth *//>
                </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button style={{ color: '#ef5350' }} variant="outlined" onClick={this.handleDelete}>
                        <DeleteIcon className={classes.icon}/>delete team
                </Button>
                <Button variant="outlined" color="secondary" onClick={this.handleSubmit} type="submit">
                    <SendIcon className={classes.icon}/>edit team
                </Button>
            </DialogActions>
            </form>
            </>

        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} size="small">
                    <EditIcon/>
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="xs">
                    <IconButton onClick={this.handleClose} className={classes.closeButton} size="small">
                        <CloseIcon />
                    </IconButton>
                    {dialogMarkup}
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
    updateTeam,
    deleteTeam
}

EditTeam.propTypes = {
    teamName: PropTypes.string.isRequired,
    teamsFields: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditTeam));