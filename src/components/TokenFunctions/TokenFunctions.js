import React, { Component } from 'react';
import TovarCoinCrowdsale from '../../../build/contracts/TovarCoinCrowdsale';
import TovarCoin from '../../../build/contracts/TovarCoin';
import contractToPromise from '../../utils/contractToPromise';
import getWeb3 from '../../utils/getWeb3'
import BigNumber from 'bignumber.js';
import co from 'co';

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import FunctionSelector from './FunctionSelector';
import Approve from './FunctionComponents/Approve';
import CheckAllowance from './FunctionComponents/CheckAllowance';
import Mint from './FunctionComponents/Mint';

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

class TokenFunctions extends Component {
  constructor(props) {
    super(props);

    this.state = {

      web3: null,
      tovarCoin: null,
      crowdsale: null,
      messageOpen: false,
      messageText: '',
      selectedFunction: 'approve'

    }
  }

  instantiateContract() {

    let that = this;
    co(function* () {
      const web3 = that.state.web3;
      const contract = require('truffle-contract');

      const crowdsaleAbstraction = contract(TovarCoinCrowdsale);
      crowdsaleAbstraction.setProvider(that.state.web3.currentProvider);

      const crowdsale = yield crowdsaleAbstraction.deployed();
      const tovarCoinAddress = yield crowdsale.token();

      const tovarCoinAbstraction = web3.eth.contract(TovarCoin.abi);
      const tovarCoin = tovarCoinAbstraction.at(tovarCoinAddress);

      that.setState({
        crowdsale,
        tovarCoin,
        address: tovarCoin.address,
        name: yield contractToPromise(tovarCoin.name),
        owner: yield contractToPromise(tovarCoin.owner),
        symbol: yield contractToPromise(tovarCoin.symbol),
        totalSupply: new BigNumber(yield contractToPromise(tovarCoin.totalSupply)).toString(),
        decimals: new BigNumber(yield contractToPromise(tovarCoin.decimals)).toString(),
        mintingFinished: yield contractToPromise(tovarCoin.mintingFinished),
      });

      console.log(tovarCoin);

    })

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

  handleFunctionChange = (event, index, value) => {
    this.setState({
      selectedFunction: value
    });
  }

  render() {

    const approve = (
      <Approve web3={this.state.web3} tovarCoin={this.state.tovarCoin}/>
    )

    const checkApprove = (
      <CheckAllowance web3={this.state.web3} tovarCoin={this.state.tovarCoin}/>
    )

    const mint = (
      <Mint web3={this.state.web3} tovarCoin={this.state.tovarCoin}/>
    )

    let chosenFunction = () => {

      let tokenFunc = this.state.selectedFunction;
      switch(true) {
        case tokenFunc === 'approve':
          return approve;
        case tokenFunc === 'checkApprove':
          return checkApprove;
        case tokenFunc === 'mint':
          return mint;

      }
    }

    return (
      <Paper className="page">

        <p>TovarCoin Address: {this.state.address}</p>
        <p>TovarCoin Name: {this.state.name}</p>
        <p>TovarCoin Owner: {this.state.owner}</p>
        <p>TovarCoin Symbol: {this.state.symbol}</p>
        <p>TovarCoin totalSupply: {this.state.totalSupply}</p>
        <p>TovarCoin decimals: {this.state.decimals}</p>
        <p>Minting Finished? {this.state.mintingFinished ? 'YES' : 'NO'}</p>

        <FunctionSelector
          selectedFunction={this.state.selectedFunction}
          handleFunctionChange={this.handleFunctionChange}
        />

      {chosenFunction()}

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

export default TokenFunctions;
