import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// MUI components
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Redux stuff
import { connect } from 'react-redux';
import { markPresent, markNotPresent, setAM, setPM, setNoPeriod } from '../redux/actions/usersActions';

const styles = {
    checkbox: {
        width: 10,
        height: 10
    },
    formControl: {
        margin: 1,
        minWidth: 120,
    },
};

export class CheckinPeriodList extends Component {

    render() {
        const { user: { userId, present, checkinPeriod }, classes} = this.props;

        const handleChange = (event) => {
           let checkinStatus = event.target.value;

           if (checkinStatus === 'AM') {
                this.props.setAM(userId, checkinPeriod);
           } else if (checkinStatus === 'PM') {
                this.props.setPM(userId, checkinPeriod);
           } else {
                this.props.setNoPeriod(userId, checkinPeriod);
           }
        };
        
        return (
            <FormControl className={classes.formControl}>
                <InputLabel shrink={true}>check-in period</InputLabel>
                <Select
                value={checkinPeriod}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value={'None'}>
                <em>None</em>
                </MenuItem>
                <MenuItem value={'AM'}>AM</MenuItem>
                <MenuItem value={'PM'}>PM</MenuItem>
                </Select>
            </FormControl>
        )
    };
}

const mapStateToProps = (state) => ({
    users: state.users.users
});

const mapActionsToProps = {
    markNotPresent,
    markPresent,
    setAM,
    setPM,
    setNoPeriod
};

CheckinPeriodList.propTypes = {
    setAM: PropTypes.func.isRequired,
    setPM: PropTypes.func.isRequired,
    setNoPeriod: PropTypes.func.isRequired,    
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CheckinPeriodList));
