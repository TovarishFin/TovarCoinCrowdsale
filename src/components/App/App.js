import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

let  _colors = require('material-ui/styles/colors');
let _colorManipulator = require('material-ui/utils/colorManipulator');

let _spacing = require('material-ui/styles/spacing');

let _spacing2 = _interopRequireDefault(_spacing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  spacing: _spacing2.default,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: _colors.purple700,
    primary2Color: _colors.purple700,
    primary3Color: _colors.grey600,
    accent1Color: _colors.indigoA200,
    accent2Color: _colors.indigoA400,
    accent3Color: _colors.indigoA700,
    textColor: _colors.fullWhite,
    secondaryTextColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.7),
    alternateTextColor: _colors.fullWhite,
    canvasColor: '#303030',
    borderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    disabledColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.3),
    pickerHeaderColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12),
    clockCircleColor: (0, _colorManipulator.fade)(_colors.fullWhite, 0.12)
  }
})

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

      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
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
