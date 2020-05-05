import React, { Component } from 'react';

// MUI components
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default ({ onClick }) => (
    <IconButton onClick={onClick} size="small">
        <AccountCircleIcon/>
    </IconButton>
)