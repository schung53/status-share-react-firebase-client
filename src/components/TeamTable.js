import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfileDialog from './ProfileDialog';
import PresenceButton from './PresenceButton';
import EditStatus from './EditStatus';

// MUI components
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

// Redux stuff
import { connect } from 'react-redux';
import {getUsers} from '../redux/actions/dataActions'

function createData(name, present, status, userId, memo, user) {
    return { name, present, status, userId, memo, user };
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    statusCell: {
        width: 180,
        flexWrap: 'wrap',
        fontSize: 12
    },
    //style for font size
    resize:{
      fontSize: 12
    },
    tableCell: {
        width: 140,
        fontSize: 13
    },
    tableCell2: {
        width: 15
    },
    checkbox: {
        width: 10,
        height: 10
    },
    box: {
        maxWidth: 110
    },
    status: {
        maxWidth: 150
    }
}

export class TeamTable extends Component {
    constructor(){
        super();
        this.state = {
            tableColor: {},
            users: []
        };
    };

    componentDidMount(){
        switch (this.props.teamName) {
            case "Team Blue":
                this.setState({ tableColor: { color: '#1565c0' } });
                break;
            case "Team Red":
                this.setState({ tableColor: { color: '#c62828' } });
                break;
            case "Team White":
                this.setState({ tableColor: { color: '#000000' } });
                break;
            case "Team Green":
                this.setState({ tableColor: { color: '#00695c' } });
                break;
            default:
                this.setState({ tableColor: { color: '#000000' } });
        };
        /* this.props.getUsers(); */
        this.setState({
            users: this.props.users
        });
    }

    render() {
        const rows = [];
        const { classes, account: { admin } } = this.props;
        this.props.teamMembers.map((user) => {rows.push(createData(user.name, user.present, user.status, user.userId, user.memo, user))})
        return (
            <div>
                <Paper elevation={3}>
                <TableContainer>
                <Table size="small">
                <TableHead>
                    <TableRow>
                            <TableCell>
                                <Typography component="div" style={this.state.tableColor}>
                                    <Box fontWeight="fontWeightBold" m={1}>
                                        {this.props.teamName}
                                    </Box>
                                </Typography>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">
                                {admin && (<IconButton size="small" aria-label="add">
                                    <AddIcon />
                                </IconButton>)}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Present</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell className={classes.tableCell}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item >
                                            <ProfileDialog userId={row.userId} userMemo={row.memo}/>
                                        </Grid>
                                        <Grid item className={classes.box}>
                                            {row.name}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center">
                                    <PresenceButton user={row.user}/>
                                </TableCell>
                                <TableCell className={classes.statusCell}>
                                    <Grid container alignItems="center" justify="space-between" spacing={1}>
                                        <Grid item className={classes.status}>
                                            {row.status}
                                        </Grid>
                                        <Grid item >
                                            <EditStatus userId={row.userId}/>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    account: state.account,
    UI: state.UI,
    user: state.data.user,
    users: state.data.users
})

TeamTable.propTypes = {
    teamMembers: PropTypes.array.isRequired,
    teamName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,

};

const mapActionsToProps = {
    getUsers
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TeamTable))
