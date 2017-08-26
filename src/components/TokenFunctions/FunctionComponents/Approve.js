import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BigNumber from 'bignumber.js';

class Approve extends Component {

  constructor(props) {
    super(props);

    this.state = {
      spenderCheckAddressError: '',
      approveCheckAddressError: ''
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

  validateAmount(e) {
    let amount;
    if(e) {
      amount = e.target.value;
    } else {
      amount = this.buyAmount.input.value;
    };

    let regex = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    this.setState({
      buyAmountError: amount.match(regex) && amount !== 0 && (amount !== '' || null) ? null : 'Please enter a valid amount to buy.'
    })
  }

  approve() {
    let spender = this.state.spenderAddress;
    let amount = this.approveAmount;
    let tovarCoin = this.props.tovarCoin;
    tovarCoin.approve(spender, 0, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        tovarCoin.approve(spender, amount, (err, res) => {
          if(err) {
            console.log(err);
          } else {
            console.log(res);
          }
        })
      }

    });
  }

  render() {
    return (
      <div>
        <h2>Approve an address to spend tokens on behalf of you</h2>
        <TextField
          name="spenderAddress"
          onChange={(e) => this.validateAddress(e)}
          value={this.state.spenderAddress}
          errorText={this.state.spenderAddressError}
          hintText="address of approved spender"
        />

        <TextField
          onChange={(e) => this.validateAmount(e)}
          value={this.state.approveAmount}
          errorText={this.state.approveAmountError}
          hintText="Amount in Ether to send"
        />

        <RaisedButton
          secondary
          onClick={() => this.approve()}
        >
          Approve Handling of funds
        </RaisedButton>
      </div>
    )
  }
}

export default Approve;
