import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UnAuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render={(props) => 
        authenticated === false && localStorage.rememberMe != 1 ? <Redirect to="/login" /> : <Component {...props} />
    }
    />
);

const mapStateToProps = (state) => ({
    authenticated: state.account.authenticated
})

UnAuthRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(UnAuthRoute);