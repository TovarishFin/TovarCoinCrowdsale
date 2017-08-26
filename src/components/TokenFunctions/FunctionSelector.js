import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class FunctionSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SelectField
        floatingLabelText="Select Token Function"
        value={this.props.selectedFunction}
        onChange={this.props.handleFunctionChange}
      >
          <MenuItem value="approve" primaryText="Approve Handler"></MenuItem>
          <MenuItem value="checkApprove" primaryText="Check Approvals"></MenuItem>
          <MenuItem value="mint" primaryText="Mint New Tokens"></MenuItem>
      </SelectField>
    )
  }

}

export default FunctionSelector;
