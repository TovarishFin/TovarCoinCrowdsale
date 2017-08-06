var TovarCoinCrowdsale = artifacts.require("./TovarCoinCrowdsale.sol");

module.exports = function(deployer) {
  const startBlock = web3.eth.blockNumber + 2;
  const endBlock = startBlock + 2073600;
  const rate = 1;
  const wallet = "0xc79aee2dce905dba6a15ecea8669b4d990c9ebdf";

  deployer.deploy(TovarCoinCrowdsale, startBlock, endBlock, rate, wallet);
};
