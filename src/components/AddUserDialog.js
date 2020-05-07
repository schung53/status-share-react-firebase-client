import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
}

export class AddUserDialog extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddUserDialog));