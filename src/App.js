import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import axios from 'axios';

// Components
import HomeRoute from './util/HomeRoute';
import LoginRoute from './util/LoginRoute';

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

axios.defaults.baseURL = 'https://us-central1-statusshare-c6dfe.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

// Auth state listener – checks whether current user is logged in
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch({ type: SET_AUTHENTICATED });
  } else {

  }
});

function App() {
  // a local state for toggling dark mode
  const [darkMode, setState] = useState(false);

  const setDarkMode = () => {
    setState(store.getState().UI.darkMode);
  }

  store.subscribe(setDarkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
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
      },
      action: {
        main: '#fff',
        contrastText: '#ffffff'
      }
    },
    typography: {
      useNextVariants: true
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
              <div className="container">
                <Switch>
                  <HomeRoute exact path="/" component={home} />
                  <LoginRoute exact path="/login" component={login} />
                </Switch>
              </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
