import React, { Component } from 'react';
import TovarCoinCrowdsale from '../../../build/contracts/TovarCoinCrowdsale';
import TovarCoin from '../../../build/contracts/TovarCoin';
import contractToPromise from '../../utils/contractToPromise';
import getWeb3 from '../../utils/getWeb3'
import BigNumber from 'bignumber.js';
import co from 'co';

import Paper from 'material-ui/Paper';

class TokenFunctions extends Component {
  constructor(props) {
    super(props);

    this.state = {

      web3: null

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
      const web3 = that.state.web3;
      const contract = require('truffle-contract');

      const crowdsaleAbstraction = contract(TovarCoinCrowdsale);
      crowdsaleAbstraction.setProvider(that.state.web3.currentProvider);

      const crowdsale = yield crowdsaleAbstraction.deployed();
      const tovarCoinAddress = yield crowdsale.token();

      const tovarCoinAbstraction = web3.eth.contract(TovarCoin.abi);
      const tovarCoin = tovarCoinAbstraction.at(tovarCoinAddress);

      that.setState({
        tovarCoin,
        address: tovarCoin.address,
        name: yield contractToPromise(tovarCoin.name),
        owner: yield contractToPromise(tovarCoin.owner),
        symbol: yield contractToPromise(tovarCoin.symbol),
        totalSupply: new BigNumber(yield contractToPromise(tovarCoin.totalSupply)).toString(),
        decimals: new BigNumber(yield contractToPromise(tovarCoin.decimals)).toString()
      });

    })

  }

  render() {

    return (
      <Paper className="page">

        <p>TovarCoin Address: {this.state.address}</p>
        <p>TovarCoin Name: {this.state.name}</p>
        <p>TovarCoin Owner: {this.state.owner}</p>
        <p>TovarCoin Symbol: {this.state.symbol}</p>
        <p>TovarCoin totalSupply: {this.state.totalSupply}</p>
        <p>TovarCoin decimals: {this.state.decimals}</p>

      </Paper>
    );

  }
}

export default TokenFunctions;
