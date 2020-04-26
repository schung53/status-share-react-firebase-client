import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Components
import Navbar from './components/navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#82e9de',
      main: '#4db6ac',
      dark: '#00867d',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#e5ffff',
      main: '#b2dfdb',
      dark: '#82ada9',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path ="/" component={home} />
                <Route exact path ="/login" component={login} />
                <Route exact path ="/signup" component={signup} />
              </Switch>
             </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
