import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import axios from 'axios';

// Components
import AuthRoute from './util/AuthRoute';
import UnAuthRoute from './util/UnAuthRoute';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';

// Pages
import home from './pages/home';
import login from './pages/login';

const config = require('./util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#534bae',
      main: '#1a237e',
      dark: '#000051',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#8e99f3',
      main: '#5c6bc0',
      dark: '#26418f',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

axios.defaults.baseURL = 'https://us-central1-statusshare-c6dfe.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
/* if (token) {
  const decodedToken = jwtDecode(token);
  // If token expired, redirect to login
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  // If token valid, set header with token
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
  };
}; */

// Auth state listener – checks whether current user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch({ type: SET_AUTHENTICATED });
  } else {

  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
            <div className="container">
              <Switch>
                <UnAuthRoute exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
              </Switch>
            </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
