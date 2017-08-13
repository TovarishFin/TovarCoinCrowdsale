import React, { Component } from 'react';
import TovarCoinCrowdsale from '../../../build/contracts/TovarCoinCrowdsale';
import getWeb3 from '../../utils/getWeb3'
import BigNumber from 'bignumber.js';
import co from 'co';
import _ from 'co-each';

import Paper from 'material-ui/Paper';

class Crowdsale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      crowdsaleInstance: null,
      crowdsaleDetails: {
        address: null,
        endBlock: null,
        hasEnded: null,
        rate: null,
        startBlock: null,
        token: null,
        wallet: null,
        weiRaised: null
      },
      web3: null

    }
  }

  componentWillMount() {

    getWeb3
    .then(web3 => {
      this.setState({
        web3
      })

      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {

    const contract = require('truffle-contract')
    const crowdsale = contract(TovarCoinCrowdsale)
    crowdsale.setProvider(this.state.web3.currentProvider)

    crowdsale.deployed()
      .then((instance) => {
        this.setState({crowdSaleInstance: instance})
        this.setContractDetails(instance);
      })
  }

  setContractDetails(crowdsale) {
    const that = this;
    co(function* () {
      let crowdsaleDetails = {};
      crowdsaleDetails.endBlock = new BigNumber(yield crowdsale.endBlock()).toString(10);
      crowdsaleDetails.hadEnded = yield crowdsale.hasEnded();
      crowdsaleDetails.rate = new BigNumber(yield crowdsale.rate()).toString(10);
      crowdsaleDetails.startBlock = new BigNumber(yield crowdsale.startBlock()).toString(10);
      crowdsaleDetails.token = yield crowdsale.token();
      crowdsaleDetails.wallet = yield crowdsale.wallet();
      crowdsaleDetails.weiRaised = new BigNumber(yield crowdsale.weiRaised()).toString(10);

      that.setState({
        crowdsaleDetails: crowdsaleDetails
      })
    });

  }

  render() {

    return (
      <Paper className="page">

        <p>The end block is: {this.state.crowdsaleDetails.endBlock}</p>
        <p>Crowdsale has ended: {this.state.crowdsaleDetails.hasEnded ? 'YES' : 'NO'}</p>
        <p>The current exchange rate is: TVR {this.state.crowdsaleDetails.rate}/ETH 1</p>
        <p>The start block is: {this.state.crowdsaleDetails.startBlock}</p>
        <p>The token contract address is: {this.state.crowdsaleDetails.token}</p>
        <p>The fund collection wallet is: {this.state.crowdsaleDetails.wallet}</p>
        <p>Wei Raised so far: {this.state.crowdsaleDetails.weiRaised}</p>

      </Paper>
    );

  }
}

export default Crowdsale;
