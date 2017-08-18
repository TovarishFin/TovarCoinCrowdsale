import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import BigNumber from 'bignumber.js';

class CheckAllowance extends Component {

  constructor(props) {
    super(props);

    this.state = {
      approveAddressError: '',
      approveAmountError: '',
    };

  }

  validateAddress(e) {
    let address = e.target.value;
    let isAddress = this.state.web3.isAddress;
    this.setState({
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: isAddress(address) ? null : 'Please enter a valid Ethereum address.'
    });
  }
  //funds 0xf3fd29E7f525fdBadBf96FABc8587d477aEac895
  //spender 0xa967406788991F6e0FF4De7a3297dFffe8293516
  checkAllowance(e) {
    let tovarCoin = this.state.tovarCoin;
    let owner = this.state.ownerCheckAddress;
    let spender = this.state.spenderCheckAddress;
    let ownerValid = !this.state.ownerCheckAddressError;
    let spenderValid = !this.state.spenderCheckAddressError;
    console.log(owner, spender, ownerValid, spenderValid)
    if(owner && spender && ownerValid && spenderValid) {
      tovarCoin.allowance(owner, spender, (err, res) => {
        console.log(err, res);
        if(err) {
          this.setState({
            messageText: `An error occurred: ${err}`
          });
          this.handleMessageOpen();
        } else {
          this.setState({
            spenderAllowance: new BigNumber(res).toString()
          });
        }
      })
    }

  }

  render() {
    return (
      <div>
        <h2>Check Allowance</h2>
        <TextField
          name="ownerCheckAddress"
          onChange={(e) => this.validateAddress(e)}
          value={this.state.ownerCheckAddress}
          errorText={this.state.ownerCheckAddressError}
          hintText="address of approved spender"
        />

        <TextField
          name="spenderCheckAddress"
          onChange={(e) => this.validateAddress(e)}
          value={this.state.spenderCheckAddress}
          errorText={this.state.spenderCheckAddressError}
          hintText="address of funds"
        />

        <p>Address: {this.state.spenderCheckAddress} has approval to handle up to {this.state.spenderAllowance} TVR from address: {this.state.ownerCheckAddress}</p>

      </div>

    )
  }
}

export default CheckAllowance;
