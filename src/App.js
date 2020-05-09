import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser } from './redux/actions/accountActions';

// Components
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
import AuthRoute from './util/AuthRoute';
import UnAuthRoute from './util/UnAuthRoute';

// Pages
import home from './pages/home';
import login from './pages/login';

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
      contrastText: '#000000'
    }
  },
  typography: {
    useNextVariants: true
  }
});


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
  };
};

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
            <div className="container">
              <Switch>
                <UnAuthRoute exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
              </Switch>
            </div>
           {/*  <BottomBar/> */}
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
