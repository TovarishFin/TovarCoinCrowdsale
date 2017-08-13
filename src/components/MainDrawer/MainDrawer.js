import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

class MainDrawer extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  handleChange = (value) => {
    console.log(value);
  }

  render() {

    return (
    <Drawer
      open={this.props.drawerOpen}
      docked={false}
      onRequestChange={this.props.toggleDrawer}
    >
      <Menu value={this.props.location.pathname}>
        <MenuItem checked={this.props.location.pathname === "/Crowdsale"} value="/Crowdsale" containerElement={<Link to="/Crowdsale"/>}>CrowdSale</MenuItem>
        <MenuItem checked={this.props.location.pathname === "/TokenFunctions"} value="/TokenFunctions" containerElement={<Link to="/TokenFunctions"/>}>Token Functions</MenuItem>
      </Menu>

    </Drawer>
    )
  }

}

export default withRouter(MainDrawer);
