import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
// import { makeStyles } from '@material-ui/core/styles';
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
    tablecell: {
        fontSize: 13
    },
    tablerow: {
        height: 15
    }
    }

const rows = [
    createData("James Chung", true, "On vacation back on 15th"),
    createData("Donald Trump", false, "Covfefe"),
    createData("James Chung", true, "On vacation back on 15th"),
    createData("Donald Trump", false, "Covfefe"),
    createData("James Chung", true, "On vacation back on 15th"),
    createData("Donald Trump", false, "Covfefe"),
    createData("James Chung", true, "On vacation back on 15th"),
    createData("Donald Trump", false, "Covfefe"),
    createData("James Chung", true, "On vacation back on 15th"),
    createData("Donald Trump", false, "Covfefe")
]

const teamATable = (props) => {
        const {classes} = props;
        return (
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                            <TableCell>
                                <Typography component="div">
                                    <Box fontWeight="fontWeightBold" m={1}>
                                        Team Blue
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
                                <TableCell className={classes.tablecell}>
                                    <IconButton size="small">
                                        <AccountCircleIcon/>
                                    </IconButton>
                                    {" "}{row.name}
                                </TableCell>
                                <TableCell align="center">
                                    <input type="checkbox" checked={check(row)}></input>
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
        );
    }

    function check(row) {
        if (row.present) {
            return true;
        } else {
            return false;
        }
    }

    export default withStyles(styles)(teamATable);
