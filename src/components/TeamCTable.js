import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function createData(name, present, status) {
    return { name, present, status };
}

const rows = [];

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 170
    },
    //style for font size
    resize:{
      fontSize: 13
    },
    tableCell: {
        width: 140,
        fontSize: 13
    },
    tableRow: {
        height: 15
    }
}

export class TeamCTable extends Component {
    render() {
        const {classes} = this.props;
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
                                    <IconButton size="small">
                                        <AccountCircleIcon/>
                                    </IconButton>
                                    {" "}{row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <input type="checkbox" class="onoffswitch-checkbox" id="inline" checked></input>
                                </TableCell>
                                <TableCell>
                                    <TextField InputProps={{classes: {input: classes.resize}}}
                                    className={classes.textField} defaultValue={row.status}/>
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
