import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BigNumber from 'bignumber.js';

class Mint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerAddressError: '',
      mintAmountError: '',
      mintAmount: 0,
      ownerAddress: ''
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
    let mintAmount;
    if(e) {
      mintAmount = e.target.value;
    } else {
      mintAmount = this.buyAmount.input.value;
    };

    let regex = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    this.setState({
      [`${e.target.name}Error`]: mintAmount.match(regex) && mintAmount !== 0 && (mintAmount !== '' || null) ? null : 'Please enter a valid amount to buy.',
      [e.target.name]: e.target.value
    })
  }

  mintTokens() {
    let tovarCoin = this.props.tovarCoin;
    let ownerAddress = this.state.ownerAddress;
    let mintAmount = this.state.mintAmount;

    console.log(ownerAddress, mintAmount)
    tovarCoin.mint(ownerAddress, mintAmount, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    })
  }

  render() {
    return (
      <div>
        <TextField
          name="ownerAddress"
          onChange={(e) => this.validateAddress(e)}
          value={this.state.ownerAddress}
          errorText={this.state.ownerAddressError}
          hintText="owner address with rights to mint"
        />

        <TextField
          name="mintAmount"
          onChange={(e) => this.validateAmount(e)}
          value={this.state.mintAmount}
          errorText={this.state.mintAmountError}
          hintText="Amount of Ether to mint"
        />

        <RaisedButton
          secondary
          onClick={() => this.mintTokens()}
        >
          Mint Tokens
        </RaisedButton>

      </div>
    )
  }

}

export default Mint;
