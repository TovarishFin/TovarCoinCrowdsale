pragma solidity ^0.4.4;

import './TovarCoin.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';


contract TovarCoinCrowdsale is Crowdsale {
  // constructor & inherited constructor
  function TovarCoinCrowdsale(
    uint256 _startBlock,
    uint256 _endBlock,
    uint256 _rate,
    address _wallet
  )
  Crowdsale(
    _startBlock,
    _endBlock,
    _rate,
    _wallet)
  {

  }

  //creates the token to be sold.
  //override this method to have crowdsale of a specific MintableToken token.
  function createTokenContract() internal returns (MintableToken) {
    return new TovarCoin("TovarCoin", "TVR", 18);
  }
}
