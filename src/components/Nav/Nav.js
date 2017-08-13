import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

class Nav extends Component {
  render() {
    return (
      <AppBar
        title="TovarCoin"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.props.toggleDrawer}
      />
    )
  }
}

export default Nav;
