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
    let isAddress = this.props.web3.isAddress;
    this.setState({
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: isAddress(address) ? null : 'Please enter a valid Ethereum address.'
    });
  }

  render() {

    let checkAllowance = () => {
      let tovarCoin = this.props.tovarCoin;
      let owner = this.state.ownerCheckAddress;
      let spender = this.state.spenderCheckAddress;
      let ownerValid = !this.state.ownerCheckAddressError;
      let spenderValid = !this.state.spenderCheckAddressError;
      console.log(owner, spender, ownerValid, spenderValid)
      if(owner && spender && ownerValid && spenderValid) {
        tovarCoin.allowance(owner, spender, (err, res) => {
          if(err) {
            console.log(err);
            return null;
          }
          console.log(new BigNumber(res).toString())
          return new BigNumber(res).toString();
        })
      }

    }

    const allowanceMessage = (
      <p>Address: {this.state.spenderCheckAddress} has approval to handle up to {checkAllowance()} TVR from address: {this.state.ownerCheckAddress}</p>
    );

    return (
      <div>
        <h2>Check Allowance</h2>
        <TextField
          name="ownerCheckAddress"
          onChange={(e) => this.validateAddress(e)}
          value={this.state.ownerCheckAddress}
          errorText={this.state.ownerCheckAddressError}
          hintText="address of funds"
        />

        <TextField
          name="spenderCheckAddress"
          onChange={(e) => this.validateAddress(e)}
          value={this.state.spenderCheckAddress}
          errorText={this.state.spenderCheckAddressError}
          hintText="address of approved spender"
        />

      {allowanceMessage}

      </div>

    )
  }
}

export default CheckAllowance;
