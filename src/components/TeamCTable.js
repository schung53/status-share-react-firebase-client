import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

function createData(name, present, status) {
    return { name, present, status };
}

// const rows = [];

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

export class TeamCTable extends Component {
    render() {
        let rows = [];
        let { classes } = this.props;
        this.props.valueFromParent.map((user) => {rows.push(createData(user.name, user.present, user.status))})
        return (
            <div>
                <Paper elevation={3}>
                <TableContainer>
                <Table size="small">
                <TableHead>
                    <TableRow>
                            <TableCell>
                                <Typography component="div" style={{ color: '#000000' }}>
                                    <Box fontWeight="fontWeightBold" m={1}>
                                        Team White
                                    </Box>
                                </Typography>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">
                                <IconButton size="small" aria-label="add">
                                    <AddIcon />
                                </IconButton>
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
                                    <Grid container alignItems="center" justify="left" spacing={1}>
                                        <Grid item >
                                            <IconButton size="small">
                                                <AccountCircleIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item className={classes.box}>
                                            {row.name}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox className={classes.checkbox} color="secondary"></Checkbox>
                                </TableCell>
                                <TableCell className={classes.statusCell}>
                                    <Grid container alignItems="center" justify="space-between" spacing={1}>
                                        <Grid item className={classes.status}>
                                            {row.status}
                                        </Grid>
                                        <Grid item >
                                            <IconButton size="small">
                                                <EditIcon/>
                                            </IconButton>
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

TeamCTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamCTable)
