import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

function createData(name, present, status) {
    return { name, present, status };
}

const useStyles = makeStyles({
    table: {
      maxWidth: 450,
    },
  });

const rows = [
    createData("James Chung", "Present", "On vacation back on 15th"),
    createData("Donald Trump", "Present", "Covfefe")
]

export default function DenseTable() {
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
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
                                <TableCell><Button size="small" variant="outlined">{row.name}</Button></TableCell>
                                <TableCell><Checkbox color="primary"/></TableCell>
                                <TableCell>
                                    <TextField id="outlined-size-small" label="" defaultValue={row.status}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

