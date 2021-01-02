import React from 'react';

// MUI components
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from '@material-ui/core/Tooltip';


export default ({ onClick, tip, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} arrow>
        <IconButton onClick={onClick} size="small">
            <AccountCircleIcon/>
        </IconButton>
    </Tooltip>
)
