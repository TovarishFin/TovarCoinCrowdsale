import React, { Component } from 'react';
import TovarCoinCrowdsale from '../../../build/contracts/TovarCoinCrowdsale';
import TovarCoin from '../../../build/contracts/TovarCoin';
import tvcUtils from './tovarCoinUtils.js';
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
      const contract = require('truffle-contract')

      const crowdsale = contract(TovarCoinCrowdsale)
      crowdsale.setProvider(that.state.web3.currentProvider)

      const crowdsaleInstance = yield crowdsale.deployed();
      const tovarCoinAddress = yield crowdsaleInstance.token();

      const tovarCoinAbstraction = web3.eth.contract(TovarCoin.abi);
      const tovarCoin = tovarCoinAbstraction.at(tovarCoinAddress);
      console.log(tovarCoin);
      let name = yield tvcUtils.toPromise(tovarCoin.name);

      that.setState({
        tovarCoin,
        address: tovarCoin.address,
        name: yield tvcUtils.toPromise(tovarCoin.name),
        owner: yield tvcUtils.toPromise(tovarCoin.owner),
        symbol: yield tvcUtils.toPromise(tovarCoin.symbol),
        totalSupply: new BigNumber(yield tvcUtils.toPromise(tovarCoin.totalSupply)).toString(),
        decimals: new BigNumber(yield tvcUtils.toPromise(tovarCoin.decimals)).toString()
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
