import React, { Component } from 'react';
import TovarCoinCrowdsale from '../../../build/contracts/TovarCoinCrowdsale';
import getWeb3 from '../../utils/getWeb3'
import BigNumber from 'bignumber.js';
import co from 'co';
import _ from 'co-each';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  snackbar: {
    backgroundColor: 'rgb(123, 31, 162)',
    color: 'rgb(255, 255, 255)',
    content: {
      color: 'rgb(255, 255, 255)'
    }
  }
};

class Crowdsale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      crowdsale: null,
      web3: null,
      messageOpen: false,
      messageText: ''
    }
  }

  componentWillMount() {

    let that = this;
    co(function* () {
      let web3 = yield getWeb3();
      that.setState({web3})
      that.instantiateContract()
    })
    .catch((err) => {
      console.log(`Error finding web3: ${err}`)
    })

  }

  instantiateContract() {

    let that = this;
    co(function* () {
      const contract = require('truffle-contract');

      const crowdsaleAbstraction = contract(TovarCoinCrowdsale)
      crowdsaleAbstraction.setProvider(that.state.web3.currentProvider)

      const crowdsale = yield crowdsaleAbstraction.deployed();

      that.setState({
        crowdsale,
        endBlock: new BigNumber(yield crowdsale.endBlock()).toString(),
        hasEnded: yield crowdsale.hasEnded(),
        rate: new BigNumber(yield crowdsale.rate()).toString(),
        startBlock: new BigNumber(yield crowdsale.startBlock()).toString(),
        token: yield crowdsale.token(),
        wallet: yield crowdsale.wallet(),
        weiRaised: new BigNumber(yield crowdsale.weiRaised()).toString()
      });
    });

  }

  buyTokens(e) {
    if(e) {
      e.preventDefault();
    }

    console.log(e);

    let from = this.state.web3.eth.coinbase;
    let value = this.state.web3.toWei(parseFloat(this.buyAmount.input.value), 'ether');
    let buyForFriend = this.state.buyForFriend;
    let toAddress = buyForFriend ? this.toAddress.input.value : from;

    if(buyForFriend) {
      this.validateToAddress();
    }
    this.validateBuyAmount();

    if(this.state.buyAmountError || this.state.toAddressError) {
      this.setState({messageText: 'Please check your input fields and try again.'});
      this.handleMessageOpen();

    } else {

      this.state.crowdsale.buyTokens(toAddress, {value, from})
        .then(res => {
          //create a response for this and put it to state!
          console.log(res);
        })
        .catch(err => {
          this.setState({
            messageText: `There was an error buying your tokens: ${err}`
          });
          this.handleMessageOpen();
        })
    }

  }

  validateBuyAmount(e) {
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

  validateToAddress(e) {
    let address;
    if(e) {
      address = e.target.value;
    } else {
      address = this.toAddress.input.value;
    };

    let isAddress = this.state.web3.isAddress;
    this.setState({
      toAddressError: isAddress(address) ? null : 'Please enter a valid Ethereum address.'
    });
  }

  handleCheck(e, checked) {
    let toAddressError = checked ? this.state.toAddressError : null;
    let buyForFriend = checked ? true : false;
    this.setState({
      buyForFriend,
      toAddressError
    });

    if(checked) {
      this.validateToAddress();
    };
  }

  handleMessageClose() {
    this.setState({
      messageOpen: false
    })
  }

  handleMessageOpen() {
    this.setState({
      messageOpen: true
    })
  }



  render() {

    return (
      <Paper className="page">

        <p>The end block is: {this.state.endBlock}</p>
        <p>Crowdsale has ended: {this.state.hasEnded ? 'YES' : 'NO'}</p>
        <p>The current exchange rate is: TVR {this.state.rate}/ETH 1</p>
        <p>The start block is: {this.state.startBlock}</p>
        <p>The token contract address is: <a href="https://kovan.etherscan.io/address/0xb781e7bf9afcc67e053a97cf6c781c2289b66ebc">{this.state.token}</a></p>
        <p>The fund collection wallet is: <a href="https://kovan.etherscan.io/address/0xc79aee2dce905dba6a15ecea8669b4d990c9ebdf">{this.state.wallet}</a></p>
        <p>Wei Raised so far: {this.state.weiRaised}</p>

        <form onSubmit={(e) => this.buyTokens(e)}>

          <TextField
            onChange={(e) => this.validateBuyAmount(e)}
            ref={(input) => {this.buyAmount = input}}
            errorText={this.state.buyAmountError}
            hintText="Amount in Ether to send"
          />

          <Checkbox
            onCheck={(e, checked) => this.handleCheck(e, checked)}
            ref={(checkbox) => {this.buyForFriend = checkbox}}
            checkedIcon={<ActionFavorite />}
            uncheckedIcon={<ActionFavoriteBorder />}
            label="Buy for a Friend"
            style={styles.checkbox}
          />

          <TextField
            disabled={!this.state.buyForFriend}
            onChange={(e) => this.validateToAddress(e)}
            ref={(input) => {this.toAddress = input}}
            errorText={this.state.toAddressError}
            hintText="Address to Send Tokens to"
          />

          <RaisedButton secondary onClick={() => this.buyTokens()}>Buy Tokens</RaisedButton>

          <input type="submit" hidden />

        </form>

        <Snackbar
          open={this.state.messageOpen}
          message={this.state.messageText}
          bodyStyle={styles.snackbar}
          contentStyle={styles.snackbar.content}
          onRequestClose={() => this.handleMessageClose()}
          onActionTouchTap={() =>this.handleMessageClose()}
          action="OK"
        />


      </Paper>
    );

  }
}

export default Crowdsale;
