pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract TovarCoin is MintableToken{

  string public name;
  string public symbol;
  uint8 public decimals;

  function TovarCoin(string _name, string _symbol, uint8 _decimals) {
    // constructor
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }

}
