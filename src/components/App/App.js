import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();


import Home from '../Home/Home';
import TokenFunctions from '../TokenFunctions/TokenFunctions';
import Crowdsale from '../Crowdsale/Crowdsale';
import Nav from '../Nav/Nav';
import MainDrawer from '../MainDrawer/MainDrawer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false
    }

  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  render() {

    return (

      <MuiThemeProvider>
        <Router>
          <div>
            <Nav toggleDrawer={this.toggleDrawer}/>
            <MainDrawer
              drawerOpen={this.state.drawerOpen}
              toggleDrawer={this.toggleDrawer}
            />
            <Route exact path="/" component={Home}/>
            <Route exact path="/Crowdsale" component={Crowdsale}/>
            <Route exact path="/TokenFunctions" component={TokenFunctions}/>

          </div>
        </Router>
      </MuiThemeProvider>

    );
  }
}

export default App
