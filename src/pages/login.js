import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet'

// Components
import AppIcon from '../images/icon.png';
import BottomBar from '../components/BottomBar';
import Navbar from '../components/Navbar';

// MUI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'

// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/accountActions';

const styles = {
    form: {
        margin: '150px auto auto auto',
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '20px auto auto auto',
        width: 300
    },
    button: {
        margin: '20px 100px 20px 100px'
    },
    customError: {
        color: 'red',
        fonstSize: '0.8rem'
    },
    image: {
        width: 45,
        height: 45,
        margin: 'auto 15px auto auto'
    }
}

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            loading: false,
            errors: {}
        };
    };

    componentDidMount(){
        localStorage.setItem('admin', 0)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        };
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading }, appName } = this.props;
        const { errors } = this.state;
        return (
            <div>
            <Helmet>
                <title>{appName} | Login</title>
            </Helmet>
            <Grid container className={classes.form} justify="center">
                <Navbar/>
                <Grid item sm/>
                <Grid item sm> 
                <Paper elevation={3}>
                    <Grid container alignItems="center" justify="center">
                    <Grid item>
                    <img src={AppIcon} className={classes.image}/>
                    </Grid>
                    <Grid item>
                    <Typography variant='h4' className={classes.pageTitle}>
                        Sign In
                    </Typography>
                    </Grid>
                    </Grid>
                    <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Email"
                                className={classes.textField}
                                helperText={errors.email}
                                error={errors.email ? true : false}
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Password"
                                className={classes.textField}
                                helperText={errors.password}
                                error={errors.password ? true : false}
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                                {errors.general && (
                                    <Typography variant="body2" className={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={loading}
                            >
                                Login
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )}
                            </Button>
                    </form>
                    </Paper>
                </Grid>
                <Grid item sm/>
                <BottomBar/>
            </Grid>
        </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    appName: state.account.appName
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
